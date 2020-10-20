import { NoteGroup } from './noteGroup';
import { Key } from './keys';
import { allNotes, allValues, degreeName, mod12, noteName } from './music';

export enum Mode {
  major,
  minor,
  lydian,
  mixolydian,
  dorian,
  phrygian,
  locrian
}

export abstract class Scale implements NoteGroup {
  static modes = [
    { value: Mode.major, label: 'Major'},
    { value: Mode.minor, label: 'Minor' },
    { value: Mode.lydian, label: 'Lydian'},
    { value: Mode.mixolydian, label: 'Mixolydian'},
    { value: Mode.dorian, label: 'Dorian'},
    { value: Mode.phrygian, label: 'Phrygian'},
    { value: Mode.locrian, label: 'Locrian'}
  ];
  static in(key: Key, mode: Mode): Scale {
    switch (mode) {
      case Mode.lydian:     return new ScaleInKey(key, [0, 2, 4, 6, 7, 9, 11], 'lydian');
      case Mode.major:      return new ScaleInKey(key, [0, 2, 4, 5, 7, 9, 11], 'major');
      case Mode.mixolydian: return new ScaleInKey(key, [0, 2, 4, 5, 7, 9, 10], 'mixolydian');
      case Mode.dorian:     return new ScaleInKey(key, [0, 2, 3, 5, 7, 9, 10], 'dorian');
      case Mode.minor:      return new ScaleInKey(key, [0, 2, 3, 5, 7, 8, 10], 'minor');
      case Mode.phrygian:   return new ScaleInKey(key, [0, 1, 3, 5, 7, 8, 10], 'phrygian');
      case Mode.locrian:    return new ScaleInKey(key, [0, 1, 3, 5, 6, 8, 10], 'locrian');
    }
  }
  static defaultScale(): Scale {
    return Scale.in(Key.defaultKey(), Mode.major);
  }
  abstract getName(): string;
  abstract contains(v: number): boolean;
  abstract noteName(v: number): string;
  abstract degreeName(v: number): string;
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

  degreeName(v: number): string {
    return '1';
  }

  isRoot(v: number): boolean {
    return 0 === v % 12;
  }
}

class ScaleInKey extends Scale {

  key: Key;
  name: string;
  formula: number[];
  noteNames: Map<number, string>;
  degreeNames: Map<number, string>;

  constructor(k: Key, pattern: number[], modeName: string) {
    super();
    this.key = k;
    const keyValue = this.key.value();
    const refValues = allValues.slice(k.letter - 1, k.letter + 6);
    const refNotes = allNotes.slice(k.letter - 1, k.letter + 6);
    const mods = pattern.map((v, i) => v + keyValue - refValues[i]);
    this.formula = pattern.map(v => mod12(v + keyValue));
    this.noteNames = new Map(refNotes.map((base, i) => [this.formula[i], noteName(base, mods[i])]));
    this.degreeNames = new Map(
      pattern.map((v, i) => [this.formula[i], degreeName(i + 1, v - allValues[i])])
    );
    this.name = noteName(allNotes[k.letter - 1], k.accidental) + ' ' + modeName + ' scale';

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

  degreeName(v: number): string {
    return this.degreeNames.get(mod12(v));
  }

  isRoot(v: number): boolean {
    return mod12(this.key.value()) === mod12(v);
  }

}
