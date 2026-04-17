import {Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'components-loader',
  imports: [],
  templateUrl: './loader.html',
  host: { class: 'block' }
})
export class Loader implements OnChanges {
  @ViewChild('bar', { static: true }) bar!: ElementRef;
  @Input() progress: number = 0;

  ngOnChanges() {
    gsap.to(this.bar.nativeElement, {
      width: this.progress + '%',
      duration: 0.3,
      ease: 'none'
    });
  }
}
