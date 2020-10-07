import { Component, OnInit } from '@angular/core';
import { SVG } from '@svgdotjs/svg.js';
import { init, draw } from './fretboard';
import { Key, Keys, Letter, Accidental } from './keys';
import { Scale } from './scales';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fretboard';

  key: Key = Keys.defaultKey();
  letters: { letter: Letter, sign: string }[] = Keys.letters;
  accidentals: { accidental: Accidental, sign: string }[] = Keys.accidentals;

  ngOnInit(): void {
    init('#canvas');
    this.redraw();
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

  redraw(): void {
    draw(Scale.inKey(this.key));
  }

  log(v: any): void {
    console.log(v);
  }
}
