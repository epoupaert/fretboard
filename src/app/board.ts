import { Scale } from './scales';

export abstract class Board {
  abstract notes(): Iterable<BoardNote>;
  abstract init(selector: string): void;
}

export interface BoardNote {
  value: number;
  show(): void;
  hide(): void;
  setName(name: string): void;
  setColor(highlighted: boolean): void;
}
