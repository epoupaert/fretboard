import { Component, OnInit } from '@angular/core';
import { SVG } from '@svgdotjs/svg.js';
import { init, draw } from './fretboard';
import { Key, Keys, Letter, Accidental } from './keys';
import { Scale, Mode } from './scales';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fretboard';

  key: Key = Keys.defaultKey();
  mode: Mode = Scale.modes[0].mode;
  scale: Scale = Scale.in(this.key, this.mode);
  letters: { letter: Letter, sign: string }[] = Keys.letters;
  accidentals: { accidental: Accidental, sign: string }[] = Keys.accidentals;
  modes: { mode: Mode, label: string }[] = Scale.modes;

  ngOnInit(): void {
    init('#canvas');
    this.redraw();
  }

  redraw(): void {
    this.scale = Scale.in(this.key, this.mode);
    draw(this.scale);
  }

  log(v: any): void {
    console.log(v);
  }
}
