import { SVG } from '@svgdotjs/svg.js';

const tuning = [4, 9, 14, 19, 23, 28];
// var all_notes = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ]
const allNotes = ['C', 'Dd', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const major = [0, 2, 4, 5, 7, 9, 11];
const minor = [0, 2, 3, 5, 7, 8, 10];
const pentaMinor = [0, 3, 5, 7, 10];

const frets = 15;

function value(i: number, j: number): number {
  console.log(i, j, tuning[i - 1] + j);
  return tuning[i - 1] + j;
}

function note_name(i: number, j: number): string {
  const v = value(i, j) % 12;
  console.log(v);
  return allNotes[v];
}

function id(i: number, j: number): string {
  return 'S' + i + 'F' + j;
}


export function init(selector: string): void {
  const svgRoot = SVG().addTo(selector).size(1500, 500);

  // var rect = draw.rect(100, 100).attr({ fill: '#f06' })

  const canvas = svgRoot.group();
  canvas.scale(4);
  canvas.translate(70, 30);
  canvas.id('canvas');

  const grid = canvas.group();

  for (let i = 0; i <= frets; i++) {
    const line = grid.line(0, 75, 0, 0).move(20 * i, 0).id('R' + i);
    const w = i === 0 ? 2 : 0.5;
    line.stroke({ color: '#000000', width: w });
  }

  for (let j = 1; j <= 6; j++) {
    const line = grid.line(0, 0, frets * 20, 0).move(0, 75 - (j - 1) * 15).id('L' + j);
    const factor = 1 - (j - 1) * 0.1;
    line.stroke({ color: '#000000', width: factor });
  }

  const notes = canvas.group();
  for (let j = 1; j <= 6; j++) {
    for (let i = 0; i <= frets; i++) {
      const note = notes.group().id(id(j, i));

      if ((i + j) % 2 === 0) {
        // note.hide()
      }
      note.hide();

      const circle = note.circle(10).move(-15 + 20 * i, -5 + 75 - (j - 1) * 15);
      circle.stroke({ color: '#000000', width: 0.5 });
      circle.fill({ color: '#cccccc' });

      const name = note_name(j, i);
      const text = note.text(name);
      text.move(-10 + 20 * i, 0.5 + 75 - (j - 1) * 15);
      text.font({
        fill: '#000000', family: 'Inconsolata', anchor: 'middle', size: 6
      });
    }
  }
}

export function draw(scale: string): void {
  let formula: number[];
  switch (scale) {
    case 'major':
      formula = major;
      break;

    case 'minor':
      formula = minor;
      break;

    case 'pentaMinor':
      formula = pentaMinor;
      break;

    default:
      break;
  }
  const canvas = SVG('#canvas');
  for (let j = 1; j <= 6; j++) {
    for (let i = 0; i <= frets; i++) {
      const v = value(j, i) % 12;
      if (formula.indexOf(v) >= 0) {
        canvas.findOne('#' + id(j, i)).show();
      } else {
        canvas.findOne('#' + id(j, i)).hide();
      }
    }
  }
}
