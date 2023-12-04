import { Component } from '@angular/core';
import { run } from './days/day3_2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aoc';

  constructor() {
    run();
  }

}
