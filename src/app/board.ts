import { Scale } from './scales';

export abstract class Board {
  abstract notes(): Iterable<BoardNote>;
  abstract init(selector: string): void;

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

export interface BoardNote {
  value: number;
  show(): void;
  hide(): void;
  setName(name: string): void;
  setColor(highlighted: boolean): void;
}
