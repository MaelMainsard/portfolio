import {Component, effect, ElementRef, inject, model, ModelSignal, Signal, ViewChild, viewChild} from '@angular/core';
import {CodeButton} from '../../components/code-button/code-button';
import {VideoService, VideoStatus} from '../../services/video-service';
import {Logo} from '../../components/logo/logo';
import gsap from 'gsap';

@Component({
  selector: 'widget-hero',
  imports: [
    CodeButton,
    Logo
  ],
  templateUrl: './hero.html'
})
export class Hero {
  private readonly videoService = inject(VideoService);
  readonly videoEl = viewChild<ElementRef<HTMLVideoElement>>('videoEl');

  maxHero: ModelSignal<boolean> = model<boolean>(true);
  readonly videoStatus: Signal<VideoStatus> = this.videoService.videoStatus;
  protected videoEnded: Boolean = false;


  onClick(): void {
    //this.videoEl()?.nativeElement.play();
    this.videoEnded = true;
    this.maxHero.set(false);
  }


}
