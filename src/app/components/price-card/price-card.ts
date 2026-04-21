import {
  Component,
  effect,
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

export interface PriceCardProps {
  id:string;
  title: string;
  subtitle: string;
  price: number;
  priceDescription: string;
  isPopular: boolean;
  features: string[];
}

@Component({
  selector: 'components-price-card',
  imports: [Triangle, CodeButton, Corner],
  templateUrl: './price-card.html',
  host: { class: 'block relative' }
})
export class PriceCard {

  data: InputSignal<PriceCardProps> = input.required<PriceCardProps>();
  clicked: OutputEmitterRef<PriceCardProps> = output<PriceCardProps>();

  @ViewChild('popularFrame') popularFrame!: ElementRef;
  @ViewChild('card') card!: ElementRef;
  @ViewChild("popularTitle") popularTitle!: ElementRef;

  constructor() {
    effect(() => {
      const isPopular = this.data().isPopular;
      if (!this.card || !this.popularFrame) return;

      const card = this.card.nativeElement;
      const frame = this.popularFrame.nativeElement;

      gsap.timeline()
        .to(card, { scale: isPopular ? 0.93 : 1, delay: 0.8, ease: "power2.inOut" })
        .set(frame, { opacity: isPopular ? 1 : 0 , ease: "power2.inOut"}, isPopular ? '>' : '<');
    });
  }


}
