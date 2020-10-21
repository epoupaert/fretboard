import { Scale } from './scales';

export enum Color { BLACK, RED, BLUE, GREEN }

export abstract class Board {
  abstract notes(): Iterable<BoardNote>;
  abstract init(selector: string): void;
  abstract remove(): void;
}

export interface BoardNote {
  value: number;
  show(): void;
  hide(): void;
  setName(name: string): void;
  setHighlight(highlight: boolean): void;
  setColor(color: Color): void;
}
