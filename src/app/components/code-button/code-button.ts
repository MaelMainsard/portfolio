import {Component, ElementRef, input, InputSignal, output, OutputEmitterRef, ViewChild} from '@angular/core';
import { LucideTriangle } from '@lucide/angular';
import gsap from 'gsap';

export enum ButtonType {
  PRIMARY = 'primary',
  DANGER = 'danger',
}

@Component({
  selector: 'components-code-button',
  imports: [LucideTriangle],
  templateUrl: './code-button.html',
})
export class CodeButton {
  title: InputSignal<string> = input<string>("");
  type: InputSignal<ButtonType> = input<ButtonType>(ButtonType.PRIMARY);
  iconLeft: InputSignal<boolean> = input<boolean>(false);
  clicked: OutputEmitterRef<void> = output<void>();
  protected readonly ButtonType = ButtonType;
  @ViewChild('codeButton') button!: ElementRef;

  onClick() {
    gsap.timeline()
      .to(this.button.nativeElement, { scaleX: 1.02, scaleY: 0.95, duration: 0.05, ease: "power2.out" })
      .to(this.button.nativeElement, { scaleX: 0.98, skewX: 2, duration: 0.05 })
      .to(this.button.nativeElement, { scaleX: 1, scaleY: 1, skewX: 0, duration: 0.1 })
      .to(this.button.nativeElement, { x: -3, duration: 0.03 })
      .to(this.button.nativeElement, { x: 3, duration: 0.03 })
      .to(this.button.nativeElement, { x: -2, duration: 0.03 })
      .to(this.button.nativeElement, { x: 0, duration: 0.03, onComplete: () => this.clicked.emit() });
  }
}
