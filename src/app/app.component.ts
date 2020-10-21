import { NoteGroup } from './noteGroup';
import { Component, OnInit } from '@angular/core';
import { Board } from './board';
import { Key, Letter, Accidental } from './keys';
import { Scale, Mode } from './scales';
import { Chord, ChordType } from './chord';
import { GuitarFretboard, UkuleleFretboard } from './fretboard';
import { drawNotesWithNames, drawNotesWithDegrees } from './visualizer';

const makeGuitare = () => new GuitarFretboard();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fretboard';

  key: Key = Key.defaultKey();
  scaleMode: Mode = Scale.modes[0].value;
  chordType: ChordType = Chord.kinds[0].value;
  noteGroup: NoteGroup;

  letters: { letter: Letter, sign: string }[] = Key.letters;
  accidentals: { accidental: Accidental, sign: string }[] = Key.accidentals;

  scaleModes = Scale.modes;
  chordTypes = Chord.kinds;

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
    { value: 'triad', label: 'Chord' },
  ];

  noteGroupFactories = new Map<string, () => NoteGroup>([
    ['scale', () => Scale.in(this.key, this.scaleMode) ],
    ['triad', () => Chord.in(this.key, this.chordType) ]
  ]);

  drawMode = 'name';
  drawModes = [
    { value: 'name', label: 'Note name' },
    { value: 'degree', label: 'Note degree' },
  ];


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
    switch (this.drawMode) {
      case 'name':
        drawNotesWithNames(this.board, this.noteGroup);
        break;
      case 'degree':
        drawNotesWithDegrees(this.board, this.noteGroup);
        break;
    }
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
