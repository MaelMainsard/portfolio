import {Component, Input} from '@angular/core';
import {Triangle} from '../triangle/triangle';

@Component({
  selector: 'components-textarea',
  imports: [
    Triangle
  ],
  templateUrl: './textarea.html'
})
export class Textarea {
  @Input() title: string = '';
  @Input() isField: boolean = false;
}
