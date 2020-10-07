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
  scale: Scale = Scale.inKey(this.key);
  letters: { letter: Letter, sign: string }[] = Keys.letters;
  accidentals: { accidental: Accidental, sign: string }[] = Keys.accidentals;

  ngOnInit(): void {
    init('#canvas');
    this.redraw();
  }

  major(): void {
    this.scale = Scale.named('major');
    draw(this.scale);
  }

  minor(): void {
    this.scale = Scale.named('minor');
    draw(this.scale);
  }

  pentaMinor(): void {
    this.scale = Scale.named('pentaMinor');
    draw(this.scale);
  }

  redraw(): void {
    this.scale = Scale.inKey(this.key);
    draw(this.scale);
  }

  log(v: any): void {
    console.log(v);
  }
}
