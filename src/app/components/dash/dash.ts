import {Component, Input} from '@angular/core';

@Component({
  selector: 'components-dash',
  imports: [],
  templateUrl: './dash.html'
})
export class Dash {
  @Input() width: number = 50;
  @Input() height: number = 40;
}
