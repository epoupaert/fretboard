import { Component, OnInit } from '@angular/core';
import { SVG } from '@svgdotjs/svg.js';
import { init, draw } from './fretboard';
import { Scale } from './scales';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'poc';

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
}
