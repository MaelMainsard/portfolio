import {
  AfterViewInit,
  Component,
  ElementRef,
  model,
  ModelSignal,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {ArrowDownRight} from '../../components/arrow-down-right/arrow-down-right';
import {ButtonSeverity, CodeButton} from '../../components/code-button/code-button';
import {Cross} from '../../components/cross/cross';
import {Dash} from '../../components/dash/dash';
import {LineA} from '../../components/line-a/line-a';
import {LineB} from '../../components/line-b/line-b';
import {Triangle} from '../../components/triangle/triangle';

import gsap from 'gsap';
import {DrawSVGPlugin} from 'gsap/DrawSVGPlugin';
import {WidgetType} from '../../pages/startup/startup';

gsap.registerPlugin(DrawSVGPlugin)

@Component({
  selector: 'widget-cookies',
  imports: [
    ArrowDownRight,
    CodeButton,
    Cross,
    Dash,
    LineA,
    LineB,
    Triangle,
    CodeButton
  ],
  templateUrl: './cookies.html',
  host: { class: 'block w-full h-full' }
})
export class Cookies implements AfterViewInit {

  crosses = Array.from({ length: 6 }, (_, i) => i);
  widgetDisplay: ModelSignal<WidgetType> = model<WidgetType>(WidgetType.COOKIE);

  @ViewChildren(Cross, { read: ElementRef }) crossItems!: QueryList<ElementRef>;
  @ViewChild('rectangle') rectangle!: ElementRef;
  @ViewChild('titleGroup') titleGroup!: ElementRef;
  @ViewChild('titleWrapper') titleWrapper!: ElementRef;
  @ViewChild('description') description!: ElementRef;


  ngAfterViewInit() {
    gsap.set(["#lineA1", "#lineA2", "#lineB"], { drawSVG: 0 });

    gsap.to("#cornerFrame", {
      top: 40,
      left: 40,
      right: 40,
      bottom: 40,
      duration: 0.5,
      delay: 0.2,
      onComplete: () => this.enterAnimation()
    });
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

    const upTimeline = gsap.timeline();
    upTimeline
      .to("#lineA1", { duration: 0.5, drawSVG: "100%" })
      .to("#lineA2", { duration: 0.5, drawSVG: "100%" })
      .set([this.rectangle.nativeElement, "#triangle"], { opacity: 1 })


    const downTimeline = gsap.timeline();
    downTimeline.to("#lineB", { duration: 1, drawSVG: "100%" })
    this.crossItems.forEach(el => downTimeline.set(el.nativeElement, { duration: 0.5, delay: 0.05, opacity: 1 }));

    const centerTimeline = gsap.timeline();
    centerTimeline
      .set(this.titleGroup.nativeElement, { opacity: 1 })
      .fromTo(this.titleWrapper.nativeElement,
        { width: 0 },
        { width: "auto", duration: 0.5, delay: 0.2, ease: "none" }
      )
      .set(this.description.nativeElement, { opacity: 1, delay: 0.3})
      .set("#accept", { opacity: 1, delay: 0.1 })
      .set("#decline", { opacity: 1, delay: 0.2 });

  }

  exitAnimation() {
    const centerTimeline = gsap.timeline();
    centerTimeline
      .to("#lineA2", { duration: 0.2, drawSVG: 0 })
      .to("#lineA1", { duration: 0.2, drawSVG: 0 })
      .set(this.description.nativeElement, { opacity: 0, delay: 0.1 })
      .to(this.titleWrapper.nativeElement, { width: 0, duration: 0.3, ease: "none" })
      .set(this.titleGroup.nativeElement, { opacity: 0, onComplete:()=> {
          this.widgetDisplay.set(WidgetType.VIDEO_LOADER);
      }});


    const crossTimeline = gsap.timeline();
    [...this.crossItems].reverse().forEach(el => crossTimeline.to(el.nativeElement, { duration: 0.1, opacity: 0 }));
    crossTimeline
      .to("#lineB", { duration: 0.1, drawSVG: 0 });



  }

  protected readonly ButtonSeverity = ButtonSeverity;
}
