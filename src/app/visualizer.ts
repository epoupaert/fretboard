import { NoteGroup } from './noteGroup';
import { Board } from './board';
import { Chord } from './chord';
import { Scale } from './scales';

export function drawNotesWithNames(board: Board, group: NoteGroup): void {
  for (const note of board.notes()) {
    const v = note.value;
    if (group.contains(v)) {
      note.show();
      note.setName(group.noteName(v));
      note.setColor(group.isRoot(v));
    } else {
      note.hide();
    }
  }
}

export function drawNotesWithDegrees(board: Board, group: NoteGroup): void {
  for (const note of board.notes()) {
    const v = note.value;
    if (group.contains(v)) {
      note.show();
      note.setName(group.degreeName(v));
      note.setColor(group.isRoot(v));
    } else {
      note.hide();
    }
  }
}
