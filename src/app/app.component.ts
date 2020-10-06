import { Component, OnInit } from '@angular/core';
import { SVG } from '@svgdotjs/svg.js';
import { init, draw, keys, accidentals } from './fretboard';
import { Scale } from './scales';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fretboard';

  key = 0;
  accidental = 0;

  ngOnInit(): void {
    init('#canvas');
  }

  major(): void {
    draw(Scale.named('major'));
  }

  minor(): void {
    draw(Scale.named('minor'));
  }

  pentaMinor(): void {
    draw(Scale.named('pentaMinor'));
  }

  onKey(k: number): void {
    this.key = k;
    draw(Scale.inKey(this.key + this.accidental));
  }

  onAccidental(a: number): void {
    this.accidental = a;
    draw(Scale.inKey(this.key + this.accidental));
  }

  keys(): { name: string, value: number }[] {
    return keys;
  }

  accidentals(): { name: string, value: number }[] {
    return accidentals;
  }
}
