import {AfterViewInit, Component, effect, ElementRef, signal, ViewChild} from '@angular/core';
import { Hero } from '../../widgets/hero/hero';
import gsap from 'gsap';
import { Realisations } from '../../widgets/realisations/realisations';
import { Price } from '../../widgets/price/price';
import { Ecology } from '../../widgets/ecology/ecology';
import { Portability } from '../../widgets/portability/portability';

@Component({
  selector: 'page-home',
  imports: [Hero, Realisations, Price, Ecology, Portability],
  templateUrl: './home.html'
})
export class Home implements AfterViewInit {
  @ViewChild(Hero, { read: ElementRef }) hero!: ElementRef;
  @ViewChild(Realisations, { read: ElementRef }) realisations!: ElementRef;
  @ViewChild(Price, { read: ElementRef }) price!: ElementRef;
  @ViewChild(Ecology, { read: ElementRef }) ecology!: ElementRef;
  @ViewChild(Portability, { read: ElementRef }) portability!: ElementRef;

  @ViewChild("home") home!: ElementRef;

  maxHero = signal<boolean>(true);
  maxPrice = signal<boolean>(false);
  heroTileMinStateSize!:DOMRect;
  priceTileMinStateSize!:DOMRect;


  constructor() {
    effect(() => {
      const heroMax = this.maxHero();
      const priceMax = this.maxPrice();

      if (priceMax) {
        this.maxPriceAnimation();
      } else if (this.price && this.priceTileMinStateSize != undefined) {
        this.minPriceAnimation();
      }

      if (!heroMax && !priceMax) {
        this.minHeroAnimation();
      }
    });
  }

  ngAfterViewInit() {
    this.enterAnimation();
  }

  minPriceAnimation(): void {
    const others = [
      this.hero.nativeElement,
      this.realisations.nativeElement,
      this.ecology.nativeElement,
      this.portability.nativeElement,
    ];

    gsap.to(this.price.nativeElement, {
      top: this.priceTileMinStateSize.top,
      left: this.priceTileMinStateSize.left,
      width: this.priceTileMinStateSize.width,
      height: this.priceTileMinStateSize.height,
      duration: 0.8,
      ease: 'back.inOut',
      onComplete: () => {
        gsap.set(this.price.nativeElement, {
          clearProps: 'position,top,left,width,height,zIndex'
        });
      }
    });
    gsap.to(others, {
      opacity: 1,
    })
    gsap.set(this.home.nativeElement, {
      overflow: "scroll",
    })
  }

  maxPriceAnimation(): void {
    const others = [
      this.hero.nativeElement,
      this.realisations.nativeElement,
      this.ecology.nativeElement,
      this.portability.nativeElement,
    ];
    gsap.to(this.price.nativeElement, {
      bottom: 8,
      left: 8,
      position: 'fixed',
      zIndex: 100,
      width: window.innerWidth - 8 * 2,
      height: window.innerHeight - 8 * 2,
      duration: 0.5,
      ease: 'back.inOut'
    })
    gsap.set(this.home.nativeElement, {
      overflow: "hidden",
    })
    gsap.to(others, {
      opacity: 0,
    })

  }


  minHeroAnimation(): void {
    gsap.timeline({ delay: 0.5 })
      .to(this.hero.nativeElement, {
        top: this.heroTileMinStateSize.top,
        left: this.heroTileMinStateSize.left,
        width: this.heroTileMinStateSize.width,
        height: this.heroTileMinStateSize.height,
        duration: 0.8,
        ease: 'back.inOut',
        onComplete: () => {
          gsap.set(this.hero.nativeElement, {
            clearProps: 'position,top,left,width,height,padding,zIndex'
          });

        }
      })
      .to(this.price.nativeElement, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.1)'
      })
      .to(this.realisations.nativeElement, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.1)'
      })
      .to(this.ecology.nativeElement, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.1)'
      })
      .to(this.portability.nativeElement, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.1)'
      })
  }

  enterAnimation(): void {
    const others = [
      this.realisations.nativeElement,
      this.price.nativeElement,
      this.ecology.nativeElement,
      this.portability.nativeElement,
    ];
    this.heroTileMinStateSize = this.hero.nativeElement.getBoundingClientRect();
    this.priceTileMinStateSize = this.price.nativeElement.getBoundingClientRect();

    gsap.set(others, { opacity: 0, scale: 0, transformOrigin: 'center center' });
    gsap.set(this.hero.nativeElement, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
      zIndex: 10
    });

    gsap.to(this.hero.nativeElement, {
        top: 4,
        left: 4,
        width: window.innerWidth - 4 * 2,
        height: window.innerHeight - 4 * 2,
        duration: 0.3,
        ease: 'back.inOut'
      })

  }
}
