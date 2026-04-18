import {AfterViewInit, Component, effect, ElementRef, model, ModelSignal, ViewChild} from '@angular/core';
import gsap from 'gsap';
import {ButtonType, CodeButton} from '../../components/code-button/code-button';
import {PriceCard} from '../../components/price-card/price-card';

@Component({
  selector: 'widget-price',
  imports: [
    CodeButton,
    PriceCard
  ],
  templateUrl: './price.html',
  host: { class: 'block w-full overflow-hidden' }

})
export class Price implements AfterViewInit {
  @ViewChild("slider") slider!: ElementRef;
  maxPrice: ModelSignal<boolean> = model<boolean>(false);


  ngAfterViewInit(): void {
    gsap.set(this.slider.nativeElement, { xPercent: -50 });
  }

  onStarterSelect():void {

  }

  onClick(): void {
    this.maxPrice.set(true);
    gsap.to(this.slider.nativeElement, {
      xPercent: 0,
      duration:0.8,
      ease: 'power2.inOut'
    });
  }

  onComeBackClick(): void {
    gsap.to(this.slider.nativeElement, {
      xPercent: -50,
      duration:0.3,
      ease: 'power2.inOut',
    });
    this.maxPrice.set(false);
  }

  protected readonly ButtonType = ButtonType;
}
