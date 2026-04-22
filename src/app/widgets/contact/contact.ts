import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  InputSignal,
  model, QueryList,
  signal,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {PriceCard, PriceCardProps} from '../../components/price-card/price-card';
import gsap from 'gsap';
import {Cross} from '../../components/cross/cross';
import {Textarea} from '../../components/textarea/textarea';
import {CodeButton} from '../../components/code-button/code-button';

@Component({
  selector: 'widget-contact',
  imports: [
    PriceCard,
    Cross,
    Textarea,
    CodeButton
  ],
  templateUrl: './contact.html'
})
export class Contact implements AfterViewInit {
  @ViewChild(PriceCard, {read: ElementRef}) priceCard!: ElementRef;
  @ViewChild("titleGroup") titleGroup!: ElementRef;
  @ViewChildren(Textarea, { read: ElementRef }) textaeras!: QueryList<ElementRef>;
  @ViewChild(CodeButton, {read: ElementRef}) button!: ElementRef;
  @ViewChildren(Cross, { read: ElementRef }) crossItems!: QueryList<ElementRef>;

  pickedCard: InputSignal<PriceCardProps> = input.required<PriceCardProps>();
  showContact = model<boolean>(false);
  crosses = Array.from({ length: 7 }, (_, i) => i);

  ngAfterViewInit() {
    gsap.fromTo(this.priceCard.nativeElement,
      { opacity: 0, y: 100, duration: 0.4 },
      { opacity: 1, y: 0, duration: 0.4 },
    )
    const timeline = gsap.timeline();
    this.crossItems.forEach(el => timeline.set(el.nativeElement, { duration: 0.5, delay: 0.05, opacity: 1 }));

    const stagger = 0.2;

    gsap.fromTo(this.titleGroup.nativeElement,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 0.4, delay: 0.2 },
    );

    this.textaeras.forEach((el, i) => {
      gsap.fromTo(el.nativeElement,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 0.4, delay: 0.2 + stagger * (i + 1) },
      );
    });

    gsap.fromTo(this.button.nativeElement,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 0.4, delay: 0.2 + stagger * (this.textaeras.length + 1) },
    );
  }

  onChangeClick(){
    gsap.to(this.priceCard.nativeElement,
      { opacity: 0, y: -100, duration: 0.4, onComplete:()=>{
          this.showContact.set(false);
      }},
    )
    const timeline = gsap.timeline();
    [...this.crossItems].reverse().forEach(el => timeline.set(el.nativeElement, { duration: 0.5, delay: 0.05, opacity: 0 }));

    const stagger = 0.2;
    const total = this.textaeras.length + 1;

    gsap.to(this.button.nativeElement,
      { opacity: 0, x: -100, duration: 0.4, delay: 0 },
    );

    this.textaeras.toArray().reverse().forEach((el, i) => {
      gsap.to(el.nativeElement,
        { opacity: 0, x: -100, duration: 0.4, delay: stagger * (i + 1) },
      );
    });

    gsap.to(this.titleGroup.nativeElement,
      { opacity: 0, x: -100, duration: 0.4, delay: stagger * total },
    );
  }
}
