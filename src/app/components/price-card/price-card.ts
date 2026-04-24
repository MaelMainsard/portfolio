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
  buttonText: InputSignal<string> = input<string>("CHOISIR");
  showPopular: InputSignal<boolean> = input<boolean>(false);
  clicked: OutputEmitterRef<PriceCardProps> = output<PriceCardProps>();

  @ViewChild('popularFrame') popularFrame!: ElementRef;
  @ViewChild('card') card!: ElementRef;
  @ViewChild("popularTitle") popularTitle!: ElementRef;

  constructor() {
    effect(() => {
      if(this.data().isPopular && this.card && this.popularFrame){
        gsap.timeline()
          .to(this.card.nativeElement, { scale: this.showPopular() ? 0.93 : 1, delay: 0.8, ease: "power2.inOut" })
          .set(this.popularFrame.nativeElement, { opacity: this.showPopular() ? 1 : 0 , ease: "power2.inOut"}, this.showPopular() ? '>' : '<');
      }
    });
  }


}
