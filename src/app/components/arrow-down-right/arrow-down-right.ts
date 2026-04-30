import {Component, Input} from '@angular/core';

@Component({
  selector: 'components-arrow-down-right',
  imports: [],
  templateUrl: './arrow-down-right.html'
})
export class ArrowDownRight {
  @Input() size: number = 40;
}
