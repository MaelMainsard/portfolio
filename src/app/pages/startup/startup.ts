import {AfterViewInit, Component, ElementRef, signal, ViewChild} from '@angular/core';
import {Corner} from '../../components/corner/corner';
import gsap from 'gsap';
import {Logo} from '../../components/logo/logo';
import {Cookies} from '../../widgets/cookies/cookies';
import {VideoLoader} from '../../widgets/video-loader/video-loader';

export enum WidgetType {
  NONE = 'none',
  COOKIE = 'cookier',
  VIDEO_LOADER = 'videoLoader',
}

export enum CookieStatus {
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  UNKNOWN = 'unknown',
}

@Component({
  selector: 'page-startup',
  imports: [
    Corner,
    Logo,
    Cookies,
    VideoLoader,
  ],
  templateUrl: './startup.html',
})
export class Startup implements AfterViewInit {

  @ViewChild('logo') logo!: ElementRef;
  widgetDisplay = signal<WidgetType>(WidgetType.NONE);

  ngAfterViewInit():void {
    this.logoStartupAnimation();
  }

  cookieStatus(): CookieStatus {
    return CookieStatus.UNKNOWN;
  }

  logoStartupAnimation(): void {
    const logoDimension = this.logo.nativeElement.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const tl = gsap.timeline()
    const tl2 = gsap.timeline()

    tl
      .set("#cornerFrame", { top: centerY, left: centerX, right: centerX, bottom: centerY, opacity: 0 })
      .to("#cornerFrame", {
        top: logoDimension.top,
        left: logoDimension.left,
        right: window.innerWidth - logoDimension.right,
        bottom: window.innerHeight - logoDimension.bottom,
        opacity: 1,
        delay: 0.8,
        duration: 0.5
      })
      .to("#cornerFrame", { top: centerY, left: centerX, right: centerX, bottom: centerY, delay: 0.5})

    tl2
      .to(this.logo.nativeElement, {scale:0, delay: 1.8, onComplete:()=>{
          if(this.cookieStatus() == CookieStatus.UNKNOWN){
            this.widgetDisplay.set(WidgetType.COOKIE);
          }
          else {
            this.widgetDisplay.set(WidgetType.VIDEO_LOADER);
          }
        }})
  }

  protected readonly WidgetType = WidgetType;
}
