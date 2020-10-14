import { NoteGroup } from './noteGroup';
import { Component, OnInit } from '@angular/core';
import { Board } from './board';
import { Chord } from './chord';
import { GuitarFretboard, UkuleleFretboard } from './fretboard';
import { Key, Letter, Accidental } from './keys';
import { Mode } from './music';
import { Scale } from './scales';
import { drawScale, drawChord } from './visualizer';

const makeGuitare = () => new GuitarFretboard();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fretboard';

  key: Key = Key.defaultKey();
  mode: Mode = Scale.modes[0].mode;
  noteGroup: NoteGroup;

  letters: { letter: Letter, sign: string }[] = Key.letters;
  accidentals: { accidental: Accidental, sign: string }[] = Key.accidentals;
  modes: { mode: Mode, label: string }[] = Scale.modes;

  boardValue = 'guitar';
  boards = [
    { label: 'Guitar', value: 'guitar' },
    { label: 'Ukulele', value: 'ukulele' }
  ];

  boardFactories = new Map<string, () => Board>([
    [ 'guitar', () => new GuitarFretboard() ],
    [ 'ukulele', () => new UkuleleFretboard() ]
  ]);

  board: Board;

  kind = 'scale';
  kinds = [
    { value: 'scale', label: 'Scale' },
    { value: 'triad', label: 'Triad' },
  ];

  noteGroupFactories = new Map<string, () => NoteGroup>([
    ['scale', () => Scale.in(this.key, this.mode) ],
    ['triad', () => Chord.in(this.key, this.mode) ]
  ]);

  onKindChanged(): void {
    this.redraw();
  }

  makeBoard(): Board { return this.boardFactories.get(this.boardValue)(); }
  makeNoteGroup(): NoteGroup {
    console.log(this.kind);
    console.log(this.noteGroupFactories);
    return this.noteGroupFactories.get(this.kind)();
  }

  ngOnInit(): void {
    this.board = this.makeBoard();
    this.noteGroup = this.makeNoteGroup();
    this.board.init('#canvas');
    this.redraw();
  }

  redraw(): void {
    this.noteGroup = this.makeNoteGroup();
    drawChord(this.board, this.noteGroup);
  }

  resetBoard(): void {
    this.board.remove();
    this.board = this.makeBoard();
    this.board.init('#canvas');
    this.redraw();
  }

  log(v: any): void {
    console.log(v);
  }
}
