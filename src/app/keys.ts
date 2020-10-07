export enum Letter {
  C = 1,
  D = 2,
  E = 3,
  F = 4,
  G = 5,
  A = 6,
  B = 7
}

export enum Accidental {
  flat = -1,
  natural = 0,
  sharp = 1
}

const letterValues = new Map([
  [ Letter.C, 0 ],
  [ Letter.D, 2 ],
  [ Letter.E, 4 ],
  [ Letter.F, 5 ],
  [ Letter.G, 7 ],
  [ Letter.A, 9 ],
  [ Letter.B, 11 ]
]);

export class Key {
  letter: Letter;
  accidental: Accidental;
  constructor(letter: Letter, accidental: Accidental) {
    this.letter = letter;
    this.accidental = accidental;
  }
  value(): number { return letterValues.get(this.letter) + this.accidental; }
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

  static defaultKey(): Key { return new Key(Letter.D, Accidental.natural); }
}


