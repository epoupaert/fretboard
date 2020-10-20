import { NoteGroup } from './noteGroup';
import { Key } from './keys';
import { allNotes, allValues, mod12, noteName, degreeName } from './music';

export enum ChordType {
  major, minor, major7, minor7, dominant7
}

export abstract class Chord implements NoteGroup {
    static kinds = [
    { value: ChordType.major, label: 'Major' },
    { value: ChordType.minor, label: 'Minor' },
    { value: ChordType.major7, label: 'Major 7' },
    { value: ChordType.minor7, label: 'Minor 7' },
    { value: ChordType.dominant7, label: '7' }
  ];

  static in(key: Key, type: ChordType): Chord {
    switch (type) {
      case ChordType.major:     return new PatternBasedChord(key, 'major',        [[1, 0], [3, 4], [5, 7]]);
      case ChordType.minor:     return new PatternBasedChord(key, 'minor',        [[1, 0], [3, 3], [5, 7]]);
      case ChordType.major7:    return new PatternBasedChord(key, 'major 7th',    [[1, 0], [3, 4], [5, 7], [7, 11]]);
      case ChordType.dominant7: return new PatternBasedChord(key, 'dominant 7th', [[1, 0], [3, 4], [5, 7], [7, 10]]);
      case ChordType.minor7:    return new PatternBasedChord(key, 'minor 7th',    [[1, 0], [3, 3], [5, 7], [7, 10]]);
    }
  }
  abstract isRoot(v: number): boolean;
  abstract noteName(v: number): string;
  abstract degreeName(v: number): string;
  abstract contains(v: number): boolean;
  abstract getName(): string;
}

class PatternBasedChord extends Chord {

  key: Key;
  name: string;
  formula: number[];
  noteNames: Map<number, string>;
  degreeNames: Map<number, string>;

  constructor(k: Key, type: string, pattern: [number, number][]) {
    super();
    this.key = k;

    const keyValue = this.key.value();
    const refValues = allValues.slice(k.letter - 1, k.letter + 6);
    const refNotes = allNotes.slice(k.letter - 1, k.letter + 6);
    const mods = pattern.map(([degree, v]) => v + keyValue - refValues[degree - 1]);
    this.formula = pattern.map(([_, v]) => mod12(v + keyValue));
    this.noteNames = new Map(pattern.map(([degree, v], i) => [this.formula[i], noteName(refNotes[degree - 1], mods[i])]));
    this.degreeNames = new Map(
      pattern.map(([degree, v], i) => [this.formula[i], degreeName(degree, v - allValues[degree - 1])])
    );

    this.name = noteName(allNotes[k.letter - 1], k.accidental) + ' ' + type + ' chord';

    console.log(k);
    console.log(pattern);
    console.log(this.noteNames);
    console.log(this.degreeNames);
  }

  getName(): string {
    return this.name;
  }

  contains(v: number): boolean {
    return this.formula.indexOf(mod12(v)) >= 0;
  }

  noteName(v: number): string {
    return this.noteNames.get(mod12(v));
  }

  degreeName(v: number): string {
    return this.degreeNames.get(mod12(v));
  }

  isRoot(v: number): boolean {
    return mod12(this.key.value()) === mod12(v);
  }
}
