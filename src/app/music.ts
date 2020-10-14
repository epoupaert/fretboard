const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
export const allNotes = notes.concat(notes);

const values = [0, 2, 4, 5, 7, 9, 11];
export const allValues = values.concat(values.map(v => v + 12));

export enum Mode {
  major,
  minor
}

export function noteName(base: string, accidental: number): string {
  if (accidental === 0) {
    return base;
  } else if (accidental > 0) {
    return base + '#'.repeat(accidental);
  } else {
    return base + 'b'.repeat(-accidental);
  }
}

export function mod12(n: number): number {
  return ((n % 12) + 12) % 12;
}
