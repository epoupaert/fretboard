export enum Letter {
  C = 0,
  D = 2,
  E = 4,
  F = 5,
  G = 7,
  A = 9,
  B = 11
}

export enum Accidental {
  flat = -1,
  natural = 0,
  sharp = 1
}

export class Key {
  letter: Letter;
  accidental: Accidental;
  constructor(letter: Letter, accidental: Accidental) {
    this.letter = letter;
    this.accidental = accidental;
  }
  value(): number { return this.letter + this.accidental; }
}

export class Keys {
  static letters: { letter: Letter, sign: string }[] = [
      { letter: Letter.C, sign: 'C' },
      { letter: Letter.D, sign: 'D' },
      { letter: Letter.E, sign: 'E' },
      { letter: Letter.F, sign: 'F' },
      { letter: Letter.G, sign: 'G' },
      { letter: Letter.A, sign: 'A' },
      { letter: Letter.B, sign: 'B' }
    ];

  static accidentals: { accidental: Accidental, sign: string }[] = [
      { accidental: Accidental.flat, sign: '\u266D' },
      { accidental: Accidental.natural, sign: '\u266E' },
      { accidental: Accidental.sharp, sign: '\u266F' }
    ];

  static defaultKey(): Key { return new Key(Letter.C, Accidental.natural); }
}


