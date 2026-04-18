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
export class PriceCard implements AfterViewInit {

  title: InputSignal<string> = input<string>('');
  subtitle: InputSignal<string> = input<string>('');
  price: InputSignal<string> = input<string>('');
  priceDescription: InputSignal<string> = input<string>('');
  isPopular: InputSignal<boolean> = input<boolean>(false);
  features: InputSignal<string[]> = input<string[]>([]);
  clicked: OutputEmitterRef<void> = output<void>();
  @ViewChild('popularFrame') popularFrame!: ElementRef;
  @ViewChild('card') card!: ElementRef;

  private viewReady = false;

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.tryAnimate();
  }

  constructor() {
    effect(() => {
      if (this.isPopular()) {
        this.tryAnimate();
      }
    });
  }

  private tryAnimate(): void {
    if (!this.viewReady || !this.isPopular()) return;

    const timeline = gsap.timeline();
    timeline
      .to(this.card.nativeElement, { scale: 0.93, delay: 5 })
      .set(this.popularFrame.nativeElement, { opacity: 1 });
  }


}
