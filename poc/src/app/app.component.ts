import { Component, OnInit } from '@angular/core';
import { SVG } from '@svgdotjs/svg.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'poc';

  ngOnInit(): void {
    const draw = SVG().addTo('#canvas').size(400, 400);
    const rect = draw.rect(100, 100);
  }

}
