import {
  AfterViewInit,
  Component, effect,
  ElementRef,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  ViewChild
} from '@angular/core';
import {Triangle} from '../triangle/triangle';
import {CodeButton} from '../code-button/code-button';
import {Corner} from '../corner/corner';
import gsap from 'gsap';

@Component({
  selector: 'components-price-card',
  imports: [Triangle, CodeButton, Corner],
  templateUrl: './price-card.html',
  host: { class: 'block relative' }
})
export class PriceCard {

  title: InputSignal<string> = input<string>('');
  subtitle: InputSignal<string> = input<string>('');
  price: InputSignal<string> = input<string>('');
  priceDescription: InputSignal<string> = input<string>('');
  isPopular: InputSignal<boolean> = input<boolean>(false);
  features: InputSignal<string[]> = input<string[]>([]);
  clicked: OutputEmitterRef<void> = output<void>();

  @ViewChild('popularFrame') popularFrame!: ElementRef;
  @ViewChild('card') card!: ElementRef;
  @ViewChild("popularTitle") popularTitle!: ElementRef;

  constructor() {
    effect(() => {
      const isPopular = this.isPopular();
      if (!this.card || !this.popularFrame) return;

      const card = this.card.nativeElement;
      const frame = this.popularFrame.nativeElement;

      gsap.timeline()
        .to(card, { scale: isPopular ? 0.93 : 1, delay: 0.8, ease: "power2.inOut" })
        .set(frame, { opacity: isPopular ? 1 : 0 , ease: "power2.inOut"}, isPopular ? '>' : '<');
    });
  }


}
