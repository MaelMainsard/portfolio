import {
  AfterViewInit,
  Component,
  effect,
  ElementRef, Input,
  input,
  InputSignal, OnInit,
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
export class PriceCard implements AfterViewInit {

  data: InputSignal<PriceCardProps> = input.required<PriceCardProps>();
  buttonText: InputSignal<string> = input<string>("CHOISIR");
  showPopular: InputSignal<boolean> = input<boolean>(false);
  @Input() showPicked: boolean = false;
  clicked: OutputEmitterRef<PriceCardProps> = output<PriceCardProps>();

  @ViewChild('popularFrame') popularFrame!: ElementRef;
  @ViewChild('card') card!: ElementRef;

  private viewReady:boolean = false;

  ngAfterViewInit(): void {
    this.viewReady = true;
  }

  constructor() {
    effect(() => {
      const frame = this.popularFrame;
      const cardEl = this.card;
      const animate = this.showPopular();

      if(this.data().isPopular && this.viewReady) {
        if (animate) {
          gsap.set(frame.nativeElement, { opacity: 1 });
          gsap.to(cardEl.nativeElement, { scale: 0.9, ease:"back.inOut" });
        } else {
          gsap.set(frame.nativeElement, { opacity: 0 });
          gsap.to(cardEl.nativeElement, { scale: 1, ease:"back.inOut" });
        }
      }
    });
  }


}
