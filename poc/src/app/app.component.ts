import { Component, OnInit } from '@angular/core';
import { SVG } from '@svgdotjs/svg.js';
import { init } from './fretboard';

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

}
