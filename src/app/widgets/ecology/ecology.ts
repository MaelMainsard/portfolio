import { Component } from '@angular/core';
import {LucideSprout} from '@lucide/angular';

@Component({
  selector: 'widget-ecology',
  imports: [
    LucideSprout
  ],
  templateUrl: './ecology.html',
  host: { class: 'block w-full overflow-hidden' }

})
export class Ecology {}
