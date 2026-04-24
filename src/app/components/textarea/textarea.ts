import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  input,
  Input,
  InputSignal, model, ModelSignal,
  Optional,
  Self, signal,
  ViewChild
} from '@angular/core';
import {Triangle} from '../triangle/triangle';
import gsap from 'gsap';
import {Field, FormField} from '@angular/forms/signals';

@Component({
  selector: 'components-textarea',
  imports: [
    Triangle,
    FormField
  ],
  templateUrl: './textarea.html'
})
export class Textarea {
  @ViewChild('right', {read: ElementRef}) right!: ElementRef;
  @ViewChild('left', {read: ElementRef}) left!: ElementRef;
  @ViewChild('dirtyGroup') dirtyGroup!: ElementRef;
  @ViewChild('dirtyMsg') dirtyMsg!: ElementRef;

  @Input() label: string = '';
  @Input() isField: boolean = false;
  @Input() type: string = 'text';
  formField = input.required<any>({alias: 'formField'});

  showDirty = signal<boolean>(false);
  dirtyReason:string = '';
  oldDirtyReason:string = '';
  protected isFocused: boolean = false;


  onInputChange() {
    setTimeout(() => {
      this.invalidHandling();
    },1000)
  }

  invalidHandling():void {
    const invalid = this.formField()().invalid();
    const errors = this.formField()().errors();
    if(invalid){
      const newReason = "SYS_ERR :: " + errors[0].message;
      if (!this.showDirty()) {
        this.dirtyReason = newReason;
        this.oldDirtyReason = newReason;
        this.showDirty.set(true);
        this.openDirtyGroup();
      } else if (newReason !== this.oldDirtyReason) {
        this.dirtyReason = newReason;
        this.changeDirtyGroup();
        this.oldDirtyReason = newReason;
      }
    }
    else {
      this.showDirty.set(false);
      this.oldDirtyReason = '';
      this.closeDirtyGroup();
    }
  }

  openDirtyGroup(): void {
    const el = this.dirtyMsg.nativeElement;
    const fullText = this.dirtyReason;

    const timeline = gsap.timeline();
    timeline.set(this.dirtyGroup.nativeElement, { opacity: 1, height: 'auto' });

    fullText.split('').forEach((char, i) => {
      timeline.to(el, {
        duration: 0.03,
        onComplete: () => {
          el.textContent += char;
        }
      }, i === 0 ? '+=0.3' : undefined);
    });
  }

  closeDirtyGroup(): void {
    const el = this.dirtyMsg.nativeElement;
    const fullText = this.dirtyReason;

    const timeline = gsap.timeline();

    fullText.split('').forEach(() => {
      timeline.to(el, {
        duration: 0.03,
        onComplete: () => {
          el.textContent = el.textContent.slice(0, -1);
        }
      });
    });

    timeline.set(this.dirtyGroup.nativeElement, { opacity: 0, height: 0 });
  }

  changeDirtyGroup(): void {
    const dirtyMsg = this.dirtyMsg.nativeElement;
    const currentText = dirtyMsg.textContent || '';
    const newText = this.dirtyReason;

    const timeline = gsap.timeline();

    for (let i = 0; i < currentText.length; i++) {
      timeline.call(() => {
        dirtyMsg.textContent = dirtyMsg.textContent.slice(0, -1);
      }, [], `+=${0.03}`);
    }

    for (let i = 0; i < newText.length; i++) {
      timeline.call(() => {
        dirtyMsg.textContent += newText[i];
      }, [], i === 0 ? '+=0.5' : `+=${0.03}`);
    }
  }

  onFocusIn(){
    gsap.to(this.right.nativeElement, {
      top: 0,
      right: 0,
      duration: 0.2,
    })
    gsap.to(this.left.nativeElement, {
      bottom: 0,
      left: 0,
      duration: 0.2,
    })
    this.isFocused = true;
  }

  onFocusOut(){
    gsap.to(this.right.nativeElement, {
      top: 8,
      right: 8,
      duration: 0.2,
    })
    gsap.to(this.left.nativeElement, {
      bottom: 8,
      left: 8,
      duration: 0.2,
    })
    this.isFocused = false;
  }

}
