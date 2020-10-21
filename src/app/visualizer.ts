import { NoteGroup } from './noteGroup';
import { Board, Color } from './board';
import { Chord } from './chord';
import { Scale } from './scales';

export function drawNotesWithNames(board: Board, group: NoteGroup): void {
  for (const note of board.notes()) {
    const v = note.value;
    if (group.contains(v)) {
      note.show();
      note.setName(group.noteName(v));
      note.setHighlight(group.isRoot(v));
    } else {
      note.hide();
    }
  }
}
const colors = new Map([
  [ '1', Color.RED ],
  [ '5', Color.BLUE ],
  [ '3', Color.GREEN ],
  [ 'b3', Color.GREEN ],
]);

export function drawNotesWithNamesAndColorDegrees(board: Board, group: NoteGroup): void {
  for (const note of board.notes()) {
    const v = note.value;
    if (group.contains(v)) {
      note.show();
      note.setName(group.noteName(v));
      const degreeName = group.degreeName(v);
      const color = colors.get(degreeName) || Color.BLACK;
      note.setColor(color);
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
      note.setHighlight(group.isRoot(v));
    } else {
      note.hide();
    }
  }
}

export function drawNotesWithDegreesAndColors(board: Board, group: NoteGroup): void {
  for (const note of board.notes()) {
    const v = note.value;
    if (group.contains(v)) {
      note.show();
      note.setName(group.degreeName(v));
      const degreeName = group.degreeName(v);
      const color = colors.get(degreeName) || Color.BLACK;
      note.setColor(color);
    } else {
      note.hide();
    }
  }
}
