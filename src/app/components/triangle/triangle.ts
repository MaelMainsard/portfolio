import {Component, Input} from '@angular/core';

@Component({
  selector: 'components-triangle',
  imports: [],
  templateUrl: './triangle.html'
})
export class Triangle {
  @Input() showLine: boolean = false;
  @Input() danger: boolean = false;
}
