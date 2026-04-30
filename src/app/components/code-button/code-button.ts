import {Component, ElementRef, Input, output, OutputEmitterRef, ViewChild} from '@angular/core';
import {LucideDynamicIcon, LucideTriangle, LucideX} from '@lucide/angular';
import gsap from 'gsap';

export enum ButtonSeverity {
  PRIMARY = 'primary',
  DANGER = 'danger',
}

export enum ButtonDirection {
  RIGHT = 'right',
  LEFT = 'left',
}

@Component({
  selector: 'components-code-button',
  imports: [LucideDynamicIcon],
  templateUrl: './code-button.html',
})
export class CodeButton {

  @Input() severity: ButtonSeverity = ButtonSeverity.PRIMARY;
  @Input() disabled: boolean = false;
  @Input() title:string = "Titre du bouton";
  @Input() type:string = "";
  @Input() buttonDirection:ButtonDirection = ButtonDirection.RIGHT;
  @ViewChild('codeButton') button!: ElementRef;

  clicked: OutputEmitterRef<void> = output<void>();
  protected triangle = LucideTriangle;
  protected cross = LucideX;

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

  protected readonly ButtonSeverity = ButtonSeverity;
  protected readonly ButtonDirection = ButtonDirection;
}
