import { Component, OnInit } from '@angular/core';
import { Fretboard } from './fretboard';
import { Key, Letter, Accidental } from './keys';
import { Scale, Mode } from './scales';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fretboard';

  key: Key = Key.defaultKey();
  mode: Mode = Scale.modes[0].mode;
  scale: Scale = Scale.in(this.key, this.mode);

  letters: { letter: Letter, sign: string }[] = Key.letters;
  accidentals: { accidental: Accidental, sign: string }[] = Key.accidentals;
  modes: { mode: Mode, label: string }[] = Scale.modes;

  fretboard: Fretboard = new Fretboard();

  ngOnInit(): void {
    this.fretboard.init('#canvas');
    this.redraw();
  }

  redraw(): void {
    this.scale = Scale.in(this.key, this.mode);
    this.fretboard.draw(this.scale);
  }

  log(v: any): void {
    console.log(v);
  }
}
