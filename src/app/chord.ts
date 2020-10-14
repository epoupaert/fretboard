import { NoteGroup } from './noteGroup';
import { Key } from './keys';
import { allNotes, allValues, mod12, Mode, noteName } from './music';

export abstract class Chord implements NoteGroup {
  static in(key: Key, mode: Mode): Chord {
    switch (mode) {
      case Mode.major:
        return new MajorChord(key);
      case Mode.minor:
        return new MinorChord(key);
    }
  }
  abstract isRoot(v: number): boolean;
  abstract noteName(v: number): string;
  abstract contains(v: number): boolean;
  abstract getName(): string;
}

const majorPattern: [number, number][] = [[1, 0], [3, 4], [5, 7]]; // [degree, value]
const minorPattern: [number, number][] = [[1, 0], [3, 3], [5, 7]]; // [degree, value]

class PatternBasedChord extends Chord {

  key: Key;
  name: string;
  formula: number[];
  noteNames: Map<number, string>;

  constructor(pattern: [number, number][], k: Key) {
    super();
    this.key = k;

    const keyValue = this.key.value();
    const refValues = allValues.slice(k.letter - 1, k.letter + 6);
    const refNotes = allNotes.slice(k.letter - 1, k.letter + 6);
    const mods = pattern.map(([degree, v]) => v + keyValue - refValues[degree - 1]);
    this.formula = pattern.map(([_, v]) => mod12(v + keyValue));
    this.noteNames = new Map(refNotes.map((base, i) => [this.formula[i], noteName(base, mods[i])]));
    this.name = noteName(allNotes[k.letter - 1], k.accidental) + ' ' + 'major' + ' triad';

    console.log(k);
    console.log(pattern);
    console.log(this.noteNames);

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

  isRoot(v: number): boolean {
    return mod12(this.key.value()) === mod12(v);
  }
}

class MajorChord extends PatternBasedChord {
  constructor(k: Key) {
    super(majorPattern, k);
  }
}

class MinorChord extends PatternBasedChord {
  constructor(k: Key) {
    super(minorPattern, k);
  }
}
