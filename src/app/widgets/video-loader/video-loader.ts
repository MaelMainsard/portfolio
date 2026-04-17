import {AfterViewInit, Component, effect, ElementRef, inject, ViewChild} from '@angular/core';
import gsap from 'gsap';
import {Loader} from '../../components/loader/loader';
import {VideoService} from '../../services/video-service';

@Component({
  selector: 'widget-video-loader',
  imports: [
    Loader
  ],
  templateUrl: './video-loader.html',
})
export class VideoLoader implements AfterViewInit {
  @ViewChild("loader") loader!: ElementRef;

  protected readonly videoService = inject(VideoService);

  constructor() {
    effect(() => {
      if (this.videoService.progress() == 100) {
        this.exitLoader();
      }
    });
  }

  ngAfterViewInit() {
    this.enterLoader();
    this.videoService.startLoading();
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
        delay: 0.4
      })
      .set(this.loader.nativeElement, {opacity: 1});
  }

  exitLoader(): void {

    if(this.loader){
      const tl = gsap.timeline();

      tl
        .set(this.loader.nativeElement, { opacity: 0, delay: 0.5 })
        .to("#cornerFrame", { top: 0, left: 0, right: 0, bottom: 0 })
        .set("#cornerFrame", { opacity: 0, onComplete: () => {
            this.videoService.notifyLoaderAnimationDone();
        }})
    }
  }
}
