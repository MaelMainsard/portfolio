import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  Input,
  model,
  ModelSignal,
  signal,
  ViewChild
} from '@angular/core';
import gsap from 'gsap';
import {ButtonType, CodeButton} from '../../components/code-button/code-button';
import {PriceCard} from '../../components/price-card/price-card';
import {delay} from 'rxjs';

@Component({
  selector: 'widget-price',
  imports: [
    CodeButton,
    PriceCard
  ],
  templateUrl: './price.html'

})
export class Price implements AfterViewInit {
  @ViewChild("slider") slider!: ElementRef;

  maxPrice: ModelSignal<boolean> = model<boolean>(false);
  showPopular = signal<boolean>(false);
  showContent = signal<boolean>(false);


  ngAfterViewInit(): void {
    gsap.set(this.slider.nativeElement, { xPercent: -50 });
  }

  onStarterSelect():void {

  }


  onClick(): void {
    this.maxPrice.set(true);
    this.showPopular.set(true);


    const tl = gsap.timeline({ defaults: {  ease: 'power2.inOut' } });

    tl.to(this.slider.nativeElement, { xPercent: 0, duration: 0.8, onComplete: ()=> {
      this.showContent.set(true);
      } });
      /*

 .fromTo(
   [this.price1.nativeElement, this.price3.nativeElement],
   { opacity: 0, y: -100 },
   { opacity: 1, y: 0, delay: 0.2, duration: 1 },
   '<'
 )
 .fromTo(
   this.price2.nativeElement,
   { opacity: 0, y: 100 },
   { opacity: 1, y: 0, duration: 1 },
   '<'
 );


       */
  }

onComeBackClick(): void {
  const tl = gsap.timeline({
    defaults: { duration: 0.3, ease: 'power2.inOut' },
    onComplete: () => {
      this.showContent.set(false);
      this.showPopular.set(false);
      this.maxPrice.set(false);
    }
  });
  gsap.to(this.slider.nativeElement, { xPercent: -50, delay: 0.5});

  /*
  tl.to([this.price1.nativeElement, this.price3.nativeElement], { opacity: 0, y: -60 })
    .to(this.price2.nativeElement, { opacity: 0, y: 60 }, '<');

   */
  }

  protected readonly ButtonType = ButtonType;

}
