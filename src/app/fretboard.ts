import { SVG, Text, Circle, Dom, Container } from '@svgdotjs/svg.js';
import { Board, BoardNote, Color } from './board';
import { Scale } from './scales';

const defaultScale = Scale.defaultScale();

abstract class Fretboard extends Board {
  abstract strings: number;
  abstract tuning: number[];
  abstract frets: number;
  abstract marks: number[];

  canvas: Container;

  value(s: number, f: number): number {
    return this.tuning[s - 1] + f;
  }

  note_name(s: number, f: number): string {
    const v = this.value(s, f);
    return defaultScale.noteName(v) || '?';
  }

  id(s: number, f: number): string {
    return 'S' + s + 'F' + f;
  }


  drawGrid(): void {
    const grid = this.canvas.group();

    for (let f = 0; f <= this.frets; f++) {
      const line = grid.line(0, (this.strings - 1) * 15, 0, 0).move(20 * f, 0).id('R' + f);
      const w = f === 0 ? 2 : 0.5;
      line.stroke({ color: '#000000', width: w });
    }

    for (let s = 1; s <= this.strings; s++) {
      const line = grid.line(0, 0, this.frets * 20, 0).move(0, (this.strings - s) * 15).id('L' + s);
      const factor = 1 - (s - 1) * 0.1;
      line.stroke({ color: '#000000', width: factor });
    }
  }

  drawNotes(): void {
    const notes = this.canvas.group();
    for (let s = 1; s <= this.strings; s++) {
      for (let f = 0; f <= this.frets; f++) {
        const note = notes.group().id(this.id(s, f));

        const circle = note.circle(10).move(-15 + 20 * f, -5 + (this.strings - s) * 15);
        circle.stroke({ color: '#000000', width: 0.5 });
        circle.fill({ color: '#cccccc' });

        const name = this.note_name(s, f);
        const text = note.plain(name);
        text.move(-10 + 20 * f, -12.7 + (this.strings - s) * 15);
        text.font({
          fill: '#000000', family: 'Inconsolata', anchor: 'middle', size: 6
        });

        note.hide();
      }
    }
  }

  drawNumbers(): void {
    const numbers = this.canvas.group();
    for (const f of this.marks) {

      const text = numbers.text(f.toString());
      text.move(-10 + 20 * f, 0.5 + (this.strings - 0.3) * 15);
      text.font({
        fill: '#000000', family: 'Inconsolata', anchor: 'middle', size: 6
      });
    }
  }

  init(selector: string): void {
    const scaleFactor = 4.65;
    const svgRoot = SVG().addTo(selector).viewbox(0, 0, (this.frets + 1) * 20 * scaleFactor, (this.strings + 1) * 15 * scaleFactor);
    this.canvas = svgRoot.group()
      .translate(75, 30)
      .scale(scaleFactor)
      .id('canvas');

    this.drawGrid();
    this.drawNotes();
    this.drawNumbers();
  }

  *notes(): Iterable<FretboardNote> {
    for (let s = 1; s <= this.strings; s++) {
      for (let f = 0; f <= this.frets; f++) {
        const value = this.value(s, f);
        const id = this.id(s, f);
        yield new FretboardNote(value, () => this.canvas.findOne('#' + id));
      }
    }
  }

  remove(): void {
    this.canvas.root().remove();
  }
}

const colors = new Map([
  [ Color.BLACK, { stroke: '#000000', fill: '#cccccc' } ],
  [ Color.RED,   { stroke: '#990000', fill: '#ff9999' } ],
  [ Color.BLUE,   { stroke: '#000099', fill: '#9999ff' } ],
  [ Color.GREEN,   { stroke: '#009900', fill: '#99ff99' } ],
]);

class FretboardNote implements BoardNote {
  value: number;
  locator: () => Dom;
  noteGroup: Dom;

  constructor(value: number, locator: () => Dom) {
    this.value = value;
    this.locator = locator;
  }

  getNoteGroup(): Dom {
    this.noteGroup = this.noteGroup || this.locator();
    return this.noteGroup;
  }

  setName(name: string): void {
    const text = this.getNoteGroup().get(1) as Text;
    text.plain(name);
  }

  setHighlight(highlight: boolean): void {
    if (highlight) {
      this.setColor(Color.RED);
    } else {
      this.setColor(Color.BLACK);
    }
  }

  setColor(color: Color): void {
    const circle = this.getNoteGroup().first() as Circle;
    circle.stroke({ color: colors.get(color).stroke, width: 0.5 });
    circle.fill({ color: colors.get(color).fill });
  }

  show(): void {
    this.getNoteGroup().show();
  }

  hide(): void {
    this.getNoteGroup().hide();
  }
}

export class GuitarFretboard extends Fretboard {
  frets = 15;
  strings = 6;
  tuning = [4, 9, 14, 19, 23, 28]; // E2, A2, D3, G3, B3, E4
  marks = [3, 5, 7, 9, 12, 15];
}

export class UkuleleFretboard extends Fretboard {
  strings = 4;
  tuning = [31, 24, 28, 33]; // G4, C4, E4, A4
  frets = 12;
  marks = [3, 5, 7, 9, 12];
}
