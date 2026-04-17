import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(MorphSVGPlugin);

@Component({
  selector: 'components-logo',
  imports: [],
  templateUrl: './logo.html'
})
export class Logo implements AfterViewInit {

  @ViewChild('svgContainer') svgContainer!: ElementRef;
  @ViewChild('shape2D')  shape2D!:  ElementRef;
  @ViewChild('shape3D')  shape3D!:  ElementRef;
  @ViewChild('letter2D') letter2D!: ElementRef;
  @ViewChild('letter3D') letter3D!: ElementRef;

  ngAfterViewInit() {
    const tl = gsap.timeline({ defaults: { duration: 1.2, ease: 'power2.inOut', delay: 0.2 } });

    tl
      .to(this.shape2D.nativeElement, {
      morphSVG: this.shape3D.nativeElement
    });

    tl.to(this.letter2D.nativeElement, {
      morphSVG: this.letter3D.nativeElement
    }, 0);
  }
}
