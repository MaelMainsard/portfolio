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
  @ViewChild(Hero,         { read: ElementRef }) hero!: ElementRef;
  @ViewChild(Realisations, { read: ElementRef }) realisations!: ElementRef;
  @ViewChild(Price,        { read: ElementRef }) price!: ElementRef;
  @ViewChild(Ecology,      { read: ElementRef }) ecology!: ElementRef;
  @ViewChild(Portability,  { read: ElementRef }) portability!: ElementRef;
  maxHero = signal<boolean>(true);
  target!:DOMRect;

  constructor() {
    effect(() => {
      if (!this.maxHero()) {
        this.minHeroAnimation();
      }
    });
  }

  ngAfterViewInit() {
    this.enterAnimation();
  }

  minHeroAnimation(): void {
    gsap.timeline({ delay: 0.5 })
      .to(this.hero.nativeElement, {
        top: this.target.top,
        left: this.target.left,
        width: this.target.width,
        height: this.target.height,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(this.hero.nativeElement, {
            clearProps: 'position,top,left,width,height,zIndex'
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
      this.price.nativeElement,
      this.realisations.nativeElement,
      this.ecology.nativeElement,
      this.portability.nativeElement,
    ];

    this.target = this.hero.nativeElement.getBoundingClientRect();

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
        top: 8,
        left: 8,
        width: window.innerWidth - 8 * 2,
        height: window.innerHeight - 8 * 2,
        borderRadius: 16,
        padding: 4,
        duration: 0.3,
        ease: 'power1.out'
      })
  }
}
