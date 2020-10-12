import { SVG, Text, Circle } from '@svgdotjs/svg.js';
import { Scale } from './scales';

const tuning = [4, 9, 14, 19, 23, 28];
// var all_notes = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ]
const allNotes = ['C', 'Dd', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const major = [0, 2, 4, 5, 7, 9, 11];
const minor = [0, 2, 3, 5, 7, 8, 10];
const pentaMinor = [0, 3, 5, 7, 10];

const frets = 15;

function value(s: number, f: number): number {
  // console.log(s, f, tuning[s - 1] + f);
  return tuning[s - 1] + f;
}

function note_name(s: number, f: number): string {
  const v = value(s, f) % 12;
  // console.log(v);
  return allNotes[v];
}

function id(s: number, f: number): string {
  return 'S' + s + 'F' + f;
}


export function init(selector: string): void {
  const svgRoot = SVG().addTo(selector) // .size(1500, 500)
    .viewbox(0, 0, 1500, 450);

  // var rect = draw.rect(100, 100).attr({ fill: '#f06' })

  const canvas = svgRoot.group();
  canvas.translate(75, 30);
  canvas.scale(4.65);
  canvas.id('canvas');

  const grid = canvas.group();

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

  const notes = canvas.group();
  for (let s = 1; s <= 6; s++) {
    for (let f = 0; f <= frets; f++) {
      const note = notes.group().id(id(s, f));

      const circle = note.circle(10).move(-15 + 20 * f, -5 + 75 - (s - 1) * 15);
      circle.stroke({ color: '#000000', width: 0.5 });
      circle.fill({ color: '#cccccc' });

      const name = note_name(s, f);
      const text = note.plain(name);
      text.move(-10 + 20 * f, -12.7 + 75 - (s - 1) * 15);
      text.font({
        fill: '#000000', family: 'Inconsolata', anchor: 'middle', size: 6
      });

      note.hide();
    }
  }

  const numbers = canvas.group();
  for (const f of [3, 5, 7, 9, 12, 15]) {

    const text = numbers.text(f.toString());
    text.move(-10 + 20 * f, 0.5 + 75 - (0.3 - 1) * 15);
    text.font({
      fill: '#000000', family: 'Inconsolata', anchor: 'middle', size: 6
    });
  }

}

export function draw(scale: Scale): void {
  const canvas = SVG('#canvas');
  for (let s = 1; s <= 6; s++) {
    for (let f = 0; f <= frets; f++) {
      const v = value(s, f) % 12;
      if (scale.contains(v)) {
        const noteGroup = canvas.findOne('#' + id(s, f));
        const text = noteGroup.get(1) as Text;
        text.plain(scale.noteName(v));
        const circle = noteGroup.first() as Circle;
        if (scale.isRoot(v)) {
          circle.stroke({ color: '#990000', width: 0.5 });
          circle.fill({ color: '#ff9999' });
        } else {
          circle.stroke({ color: '#000000', width: 0.5 });
          circle.fill({ color: '#cccccc' });
        }
        noteGroup.show();
      } else {
        canvas.findOne('#' + id(s, f)).hide();
      }
    }
  }
}
