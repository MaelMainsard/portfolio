import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChildren,
  QueryList,
  ElementRef,
  inject,
  ViewChild
} from '@angular/core';
import {Corner} from '../../components/corner/corner';
import {LineA} from '../../components/line-a/line-a';
import {Triangle} from '../../components/triangle/triangle';
import {LineB} from '../../components/line-b/line-b';
import {Cross} from '../../components/cross/cross';
import {Dash} from '../../components/dash/dash';
import {ArrowDownRight} from '../../components/arrow-down-right/arrow-down-right';
import {ButtonType, CodeButton} from '../../components/code-button/code-button';
import gsap from 'gsap';
import {DrawSVGPlugin} from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin)

@Component({
  selector: 'app-cookies',
  imports: [
    Corner,
    LineA,
    Triangle,
    LineB,
    Cross,
    Dash,
    ArrowDownRight,
    CodeButton
  ],
  templateUrl: './cookies.html'
})
export class Cookies implements AfterViewInit {
  private cdr = inject(ChangeDetectorRef);
  protected readonly ButtonType = ButtonType;
  protected showCookie:boolean = true;
  crosses = Array.from({ length: 6 }, (_, i) => i);
  @ViewChildren(Cross, { read: ElementRef }) crossItems!: QueryList<ElementRef>;
  @ViewChild("loader") loader!: ElementRef;


  ngAfterViewInit() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    let tl = gsap.timeline();
    tl
      .set(".content", { opacity: 0 })
      .set("#cornerFrame", { top: centerY, left: centerX, right: centerX, bottom: centerY })

    if(this.showCookie){
      tl.to("#cornerFrame", { top: 40, left: 40, right: 40, bottom: 40, duration: 0.5, delay: 0.2, onComplete: () => {
            this.enterAnimation();
          }});
    }
    else {
      this.enterLoader();
    }

  }

  onAcceptClick():void {
    let tl = gsap.timeline();
    tl
      .set("#accept", {opacity: 0, delay: 0.1})
      .set("#decline", {opacity: 0, delay: 0.2, onComplete: () => {
        this.exitAnimation();
      }})
  }

  onDeclineClick():void {
    let tl = gsap.timeline();
    tl
      .set("#decline", {opacity: 0, delay: 0.1})
      .set("#accept", {opacity: 0, delay: 0.2, onComplete: () => {
          this.exitAnimation();
        }})
  }

  enterAnimation() {
    let tl = gsap.timeline();
    tl
      .set(".content", { opacity: 1 })
      .set(".widget", { display: "none" })
      .from("#lineA1", { duration: 0.5, drawSVG: 0 })
      .from("#lineA2", { duration: 0.5, drawSVG: 0 })
      .set(".widget", { duration: 0.1, display: "block" })
    ;

    let tl2 = gsap.timeline();
    tl2
      .set(this.crossItems.map(el => el.nativeElement), { opacity: 0 })
      .from("#lineB", { duration: 1, drawSVG: 0 });
    this.crossItems.forEach(el => tl2.to(el.nativeElement, { duration: 0.1, opacity: 1 }));

    let tl3 = gsap.timeline();
    tl3
      .set("#description", { opacity: 0 })
      .set("#accept", { opacity: 0 })
      .set("#decline", { opacity: 0 })
      .fromTo("#title-wrapper",
        { width: 0 },
        { width: "auto", duration: 0.5, delay: 0.2, ease: "none" }
      )
      .set("#description", { opacity: 1, delay: 0.3})
      .set("#accept", { opacity: 1, delay: 0.1 })
      .set("#decline", { opacity: 1, delay: 0.2 })
    ;
  }

  exitAnimation() {
    let tl = gsap.timeline();
    tl
      .to("#lineA2", { duration: 0.2, drawSVG: 0 })
      .to("#lineA1", { duration: 0.2, drawSVG: 0 })
      .set("#description", { opacity: 0, delay: 0.1 })
      .to("#title-wrapper", { width: 0, duration: 0.3, ease: "none" })
      .set("#dash", { opacity: 0 })
      .set("#arrowDown", { opacity: 0 })
      .set(".widget", { display: "none", onComplete: () => {
        this.showCookie = false;
        this.cdr.detectChanges();
        this.enterLoader();
        }
      });

    let tl2 = gsap.timeline();
    [...this.crossItems].reverse().forEach(el => tl2.to(el.nativeElement, { duration: 0.1, opacity: 0 }));
    tl2
      .to("#lineB", { duration: 0.1, drawSVG: 0 });

  }

  enterLoader(): void {
    const loaderRect = this.loader.nativeElement.getBoundingClientRect();

    let tl = gsap.timeline();
    tl
      .set( this.loader.nativeElement, {opacity: 0})
      .to("#cornerFrame", {
        top: loaderRect.top,
        left: loaderRect.left,
        right: window.innerWidth - loaderRect.right,
        bottom: window.innerHeight - loaderRect.bottom,
        duration: 0.5,
        delay: 0.2
      })
      .set(this.loader.nativeElement, {opacity: 1});
  }

}
