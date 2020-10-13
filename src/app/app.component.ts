import { Component, OnInit } from '@angular/core';
import { Board } from './board';
import { GuitarFretboard, UkuleleFretboard } from './fretboard';
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

  board: Board = new GuitarFretboard();
  // board: Board = new UkuleleFretboard();

  ngOnInit(): void {
    this.board.init('#canvas');
    this.redraw();
  }

  redraw(): void {
    this.scale = Scale.in(this.key, this.mode);
    this.board.draw(this.scale);
  }

  log(v: any): void {
    console.log(v);
  }
}
