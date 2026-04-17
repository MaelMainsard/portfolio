import {Component, model, ModelSignal} from '@angular/core';
import {CodeButton} from '../../components/code-button/code-button';

@Component({
  selector: 'widget-hero',
  imports: [
    CodeButton
  ],
  templateUrl: './hero.html',
  host: { class: 'block w-full h-full overflow-hidden' }
})
export class Hero {
  maxHero: ModelSignal<boolean> = model<boolean>(true);
  onClick(): void {
    this.maxHero.set(false);
  }
}
