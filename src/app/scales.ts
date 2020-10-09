import { Key, Letter, Accidental } from './keys';

export abstract class Scale {
  static named(name: string): Scale {
    switch (name) {
      case 'major':
        return new MajorScale();
        break;
      case 'minor':
        return new MinorScale();
        break;
      case 'pentaMinor':
        return new PentaMinorScale();
        break;

      default:
        break;
    }
  }
  static inKey(key: Key): Scale {
    return new MajorScaleInKey(key);
  }
  abstract getName(): string;
  abstract contains(v: number): boolean;
  abstract noteName(v: number): string;
  abstract isRoot(v: number): boolean;
}

class PentaMinorScale extends Scale {
  formula = [0, 3, 5, 7, 10];

  getName(): string {
    return 'C minor pentatonic';
  }

  contains(v: number): boolean {
    return this.formula.indexOf(v % 12) >= 0;
  }

  noteName(v: number): string {
    return 'C';
  }

  isRoot(v: number): boolean {
    return 0 === v % 12;
  }
}

const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const allNotes = notes.concat(notes);

const values = [0, 2, 4, 5, 7, 9, 11];
const allValues = values.concat(values.map(v => v + 12));

function noteName(base: string, accidental: number): string {
  if (accidental === 0) {
    return base;
  } else if (accidental > 0) {
    return base + '#'.repeat(accidental);
  } else {
    return base + 'b'.repeat(-accidental);
  }
}

function mod12(n: number): number {
  return ((n % 12) + 12) % 12;
}

abstract class ScaleInKey extends Scale {

  key: Key;
  name: string;
  formula: number[];
  noteNames: Map<number, string>;

  constructor(k: Key, pattern: number[], modeName: string) {
    super();
    this.key = k;
    const keyValue = this.key.value();
    const refValues = allValues.slice(k.letter - 1, k.letter + 6);
    const refNotes = allNotes.slice(k.letter - 1, k.letter + 6);
    const mods = pattern.map((v, i) => v + keyValue - refValues[i]);
    this.formula = pattern.map(v => mod12(v + keyValue));
    this.noteNames = new Map(refNotes.map((base, i) => [this.formula[i], noteName(base, mods[i])]));
    this.name = noteName(allNotes[k.letter - 1], k.accidental) + ' ' + modeName;

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

class MajorScaleInKey extends ScaleInKey {
  constructor(k: Key) {
    super(k, [0, 2, 4, 5, 7, 9, 11], 'major');
  }
}

class MinorScaleInKey extends ScaleInKey {
  constructor(k: Key) {
    super(k, [0, 2, 3, 5, 7, 8, 10], 'minor');
  }
}

class MajorScale extends MajorScaleInKey {
  constructor() {
    super(new Key(Letter.C, Accidental.natural));
  }
}

class MinorScale extends MinorScaleInKey {
  constructor() {
    super(new Key(Letter.C, Accidental.natural));
  }
}
