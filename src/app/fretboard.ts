import { SVG, Text, Circle, Element, Dom, G, Container } from '@svgdotjs/svg.js';
import { Scale } from './scales';

const frets = 15;
const tuning = [4, 9, 14, 19, 23, 28];
const defaultScale = Scale.defaultScale();

export class Fretboard {
  canvas: Container;

  value(s: number, f: number): number {
    return tuning[s - 1] + f;
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

    for (let f = 0; f <= frets; f++) {
      const line = grid.line(0, 75, 0, 0).move(20 * f, 0).id('R' + f);
      const w = f === 0 ? 2 : 0.5;
      line.stroke({ color: '#000000', width: w });
    }

    for (let s = 1; s <= 6; s++) {
      const line = grid.line(0, 0, frets * 20, 0).move(0, 75 - (s - 1) * 15).id('L' + s);
      const factor = 1 - (s - 1) * 0.1;
      line.stroke({ color: '#000000', width: factor });
    }
  }

  drawNotes(): void {
    const notes = this.canvas.group();
    for (let s = 1; s <= 6; s++) {
      for (let f = 0; f <= frets; f++) {
        const note = notes.group().id(this.id(s, f));

        const circle = note.circle(10).move(-15 + 20 * f, -5 + 75 - (s - 1) * 15);
        circle.stroke({ color: '#000000', width: 0.5 });
        circle.fill({ color: '#cccccc' });

        const name = this.note_name(s, f);
        const text = note.plain(name);
        text.move(-10 + 20 * f, -12.7 + 75 - (s - 1) * 15);
        text.font({
          fill: '#000000', family: 'Inconsolata', anchor: 'middle', size: 6
        });

        note.hide();
      }
    }
  }

  drawNumbers(): void {
    const numbers = this.canvas.group();
    for (const f of [3, 5, 7, 9, 12, 15]) {

      const text = numbers.text(f.toString());
      text.move(-10 + 20 * f, 0.5 + 75 - (0.3 - 1) * 15);
      text.font({
        fill: '#000000', family: 'Inconsolata', anchor: 'middle', size: 6
      });
    }
  }

  init(selector: string): void {
    const svgRoot = SVG().addTo(selector).viewbox(0, 0, 1500, 450);
    this.canvas = svgRoot.group()
      .translate(75, 30)
      .scale(4.65)
      .id('canvas');

    this.drawGrid();
    this.drawNotes();
    this.drawNumbers();
  }


  *notes(): IterableIterator<FretboardNote> {
    for (let s = 1; s <= 6; s++) {
      for (let f = 0; f <= frets; f++) {
        const value = this.value(s, f);
        const id = this.id(s, f);
        yield new FretboardNote(this.canvas, id, value);
      }
    }
  }

  draw(scale: Scale): void {
    for (const note of this.notes()) {
      const v = note.value;
      if (scale.contains(v)) {
        note.show();
        note.setName(scale.noteName(v));
        note.setColor(scale.isRoot(v));
      } else {
        note.hide();
      }
    }
  }
}

class FretboardNote {
  canvas: Dom;
  noteGroup: Dom;
  id: string;
  value: number;

  constructor(canvas: Dom, id: string, value: number) {
    this.canvas = canvas;
    this.id = id;
    this.value = value;
  }

  getNoteGroup(): Dom {
    this.noteGroup = this.noteGroup || this.canvas.findOne('#' + this.id);
    return this.noteGroup;
  }

  setName(name: string): void {
    const text = this.getNoteGroup().get(1) as Text;
    text.plain(name);
  }

  setColor(highlight: boolean): void {
    const circle = this.getNoteGroup().first() as Circle;
    if (highlight) {
      circle.stroke({ color: '#990000', width: 0.5 });
      circle.fill({ color: '#ff9999' });
    } else {
      circle.stroke({ color: '#000000', width: 0.5 });
      circle.fill({ color: '#cccccc' });
    }
  }

  show(): void {
    this.getNoteGroup().show();
  }

  hide(): void {
    this.getNoteGroup().hide();
  }
}
