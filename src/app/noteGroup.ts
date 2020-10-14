export interface NoteGroup {
  isRoot(v: number): boolean;
  noteName(v: number): string;
  contains(v: number): boolean;
  getName(): string;
}
