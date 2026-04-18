import { Component } from '@angular/core';
import {LucideGlobe, LucideSprout} from "@lucide/angular";

@Component({
  selector: 'widget-portability',
  imports: [
    LucideSprout,
    LucideGlobe
  ],
  templateUrl: './portability.html',
  host: { class: 'block w-full overflow-hidden' }

})
export class Portability {}
