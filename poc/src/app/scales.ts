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
  abstract contains(v: number): boolean;
}

class MajorScale extends Scale {
  formula = [0, 2, 4, 5, 7, 9, 11];

  contains(v: number): boolean {
    return this.formula.indexOf(v % 12) >= 0;
  }
}

class MinorScale extends Scale {
  formula = [0, 2, 3, 5, 7, 8, 10];

  contains(v: number): boolean {
    return this.formula.indexOf(v % 12) >= 0;
  }
}

class PentaMinorScale extends Scale {
  formula = [0, 3, 5, 7, 10];

  contains(v: number): boolean {
    return this.formula.indexOf(v % 12) >= 0;
  }
}
