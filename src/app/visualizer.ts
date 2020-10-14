import { Board } from './board';
import { Chord } from './chord';
import { Scale } from './scales';

export function drawScale(board: Board, scale: Scale): void {
  for (const note of board.notes()) {
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

export function drawChord(board: Board, chord: Chord): void {
  for (const note of board.notes()) {
    const v = note.value;
    if (chord.contains(v)) {
      note.show();
      note.setName(chord.noteName(v));
      note.setColor(chord.isRoot(v));
    } else {
      note.hide();
    }
  }
}
