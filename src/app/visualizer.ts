import { Board } from './board';
import { Scale } from './scales';

export function draw(board: Board, scale: Scale): void {
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
