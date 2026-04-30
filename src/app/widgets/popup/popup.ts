import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  model,
  ModelSignal, signal,
  ViewChild
} from '@angular/core';
import gsap from 'gsap';
import {Corner} from '../../components/corner/corner';
import {ButtonSeverity, CodeButton} from '../../components/code-button/code-button';
import {ArrowDownRight} from '../../components/arrow-down-right/arrow-down-right';
import {Dash} from '../../components/dash/dash';
import { NgxResizeObserverModule } from 'ngx-resize-observer';

@Component({
  selector: 'widget-popup',
  imports: [
    Corner,
    CodeButton,
    CodeButton,
    ArrowDownRight,
    Dash,
    NgxResizeObserverModule
  ],
  templateUrl: './popup.html'
})
export class Popup implements AfterViewInit {
  private viewInit:boolean = false;
  @ViewChild('popup') popup!: ElementRef;
  @ViewChild('popupContainer') popupContainer!: ElementRef;
  @ViewChild('header') header!: ElementRef;

  openPopup: ModelSignal<boolean> = model(false);
  titleMultiline = signal<boolean>(false);
  titleWidth:number = 0;

  constructor() {
    effect(() => {
      const openPopup:boolean = this.openPopup();
      if(openPopup && this.viewInit){
        const timeline = gsap.timeline({defaults:{ ease: "back.inOut"}});
        timeline
          .set(this.popupContainer.nativeElement,{display:'flex'})
          .fromTo(this.popup.nativeElement,
            {scale: 0, opacity: 0},
            {scale: 1, opacity: 1, duration: 0.5},
        )
      }
    });
  }

  onPopupResize(event:ResizeObserverEntry): void {
    this.titleMultiline.set((this.titleWidth+10) >= event.contentRect.width);
  }

  ngAfterViewInit(){
    this.openPopup.set(true);
    this.titleWidth = this.header.nativeElement.getBoundingClientRect().width;
    this.viewInit = true;
  }

  closePopup(){
    gsap.to(this.popup.nativeElement,
      {scale: 0, opacity: 0, duration: 0.3, onComplete:()=>{
          this.openPopup.set(false);
          gsap.set(this.popupContainer.nativeElement,{display:'none'});
       }}
    )
  }


  protected readonly ButtonSeverity = ButtonSeverity;
}
