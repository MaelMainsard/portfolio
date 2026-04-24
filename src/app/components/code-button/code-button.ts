import {Component, ElementRef, Input, input, InputSignal, output, OutputEmitterRef, ViewChild} from '@angular/core';
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
  @Input() buttonType: string = "";
  @Input() disabled: boolean = false;
  iconLeft: InputSignal<boolean> = input<boolean>(false);
  clicked: OutputEmitterRef<void> = output<void>();
  protected readonly ButtonType = ButtonType;
  @ViewChild('codeButton') button!: ElementRef;


  onClick() {
    if(!this.disabled){
      gsap.timeline({onComplete:()=>{ this.clicked.emit() }})
        .to(this.button.nativeElement, { scaleX: 1.02, scaleY: 0.95, duration: 0.05, ease: "power2.out" })
        .to(this.button.nativeElement, { scaleX: 0.98, skewX: 2, duration: 0.05 })
        .to(this.button.nativeElement, { scaleX: 1, scaleY: 1, skewX: 0, duration: 0.1 })
        .to(this.button.nativeElement, { x: -3, duration: 0.03 })
        .to(this.button.nativeElement, { x: 3, duration: 0.03 })
        .to(this.button.nativeElement, { x: -2, duration: 0.03 })
        .to(this.button.nativeElement, { x: 0, duration: 0.03 });
    }
  }
}
