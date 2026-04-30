import {
  afterNextRender,
  AfterViewInit,
  Component, effect,
  ElementRef, inject, Injector,
  model,
  ModelSignal, signal,
  ViewChild
} from '@angular/core';
import gsap from 'gsap';
import {ButtonDirection, ButtonSeverity, CodeButton} from '../../components/code-button/code-button';
import {PriceCard, PriceCardProps} from '../../components/price-card/price-card';
import {Contact} from '../contact/contact';

@Component({
  selector: 'widget-price',
  imports: [
    CodeButton,
    PriceCard,
    Contact,
    CodeButton
  ],
  templateUrl: './price.html'

})
export class Price implements AfterViewInit {
  @ViewChild("slider") slider!: ElementRef;

  prices: PriceCardProps[] = [
    {
      id: "card-starter",
      title: "Starter",
      subtitle: "Vitrine simple & professionnelle",
      price: 299,
      priceDescription: "+ 15 €/mois hébergement & maintenance",
      features: [
        "Site one-page ou 3–4 pages statiques",
        "Présentation de l'univers & portfolio",
        "Liens réseaux sociaux & boutiques (Etsy, Gumroad…)",
        "Formulaire de contact",
        "Responsive mobile",
        "1 aller-retour de corrections inclus"
      ],
      isPopular: false
    },
    {
      id: "card-studio",
      title: "Studio",
      subtitle: "Site vivant avec animations",
      price: 649,
      priceDescription: "+ 25 €/mois hébergement & maintenance",
      features: [
        "Tout le Starter",
        "Jusqu'à 7 pages avec transitions animées",
        "Galerie manga / illustrations interactive",
        "Lecteur de chapitres (extrait gratuit)",
        "Section actualités / blog simple",
        "Intégration newsletter (Mailchimp, Brevo…)",
        "3 allers-retours de corrections inclus"
      ],
      isPopular: true
    },
    {
      id: "card-premium",
      title: "Premium",
      subtitle: "Expérience immersive sur-mesure",
      price: 1290,
      priceDescription: "+ 40 €/mois hébergement & maintenance",
      features: [
        "Tout le Studio",
        "Design graphique entièrement personnalisé",
        "Animations avancées (parallax, scroll…)",
        "Boutique intégrée (vente directe, PDF…)",
        "Espace membres / contenu exclusif",
        "Dashboard auteur (stats, gestion)",
        "Corrections illimitées sur 30 jours"
      ],
      isPopular: false
    },
  ];
  pickedCard!: PriceCardProps;
  changeCard:boolean = false;

  maxPrice: ModelSignal<boolean> = model<boolean>(false);
  showContact = signal<boolean>(false);
  showPopular = signal<boolean>(false);

  injector = inject(Injector);

  constructor() {
    effect(() => {
      if (!this.showContact()) {
        afterNextRender(() => {
          gsap.fromTo("#card-starter",  {opacity: 0, y: -100}, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
          gsap.fromTo("#card-studio",  {opacity: 0, y: 100}, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
          gsap.fromTo("#card-premium", {opacity: 0, y: -100}, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
          if(this.changeCard){
            gsap.delayedCall(0.2, () => this.showPopular.set(true));
          }
        }, { injector: this.injector });
      }
    });
  }

  ngAfterViewInit(): void {
    gsap.set(this.slider.nativeElement, { xPercent: -50 });
  }

  onCardClick(card: PriceCardProps): void {
    this.pickedCard = card;
    this.changeCard = true;
    this.showPopular.set(false);
    const cardNotClicked = this.prices.filter(price => price !== card);
    const timeline = gsap.timeline({ defaults: { ease: 'power2.in' } });

    cardNotClicked.map(price => {
      timeline.to(`#${price.id}`, { opacity: 0, y: 100, duration: 0.2 })
    })

    timeline.to(`#${card.id}`, { opacity: 0, y: -100, duration: 0.2, onComplete:()=>{
        this.showContact.set(true);
    }})
  }


  onClick(): void {
    this.maxPrice.set(true);
    gsap.to(this.slider.nativeElement, { xPercent: 0, duration: 0.8, ease: 'power2.inOut'});
    gsap.fromTo("#card-starter", { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.6, ease: 'power2.out' });
    gsap.fromTo("#card-studio", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.8, ease: 'power2.out' });
    gsap.fromTo("#card-premium", { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: 0.6, delay: 1.0, ease: 'power2.out'});
    gsap.delayedCall(1.2, () => this.showPopular.set(true));
  }


  onComeBackClick(): void {
    this.showPopular.set(false);
    gsap.to("#card-starter", { opacity: 0, y: -100, duration: 0.4, delay: 0.15, ease: 'power2.in' });
    gsap.to("#card-studio", { opacity: 0, y: 100, duration: 0.4, delay: 0.3, ease: 'power2.in' });
    gsap.to("#card-premium", { opacity: 0, y: -100, duration: 0.4, delay: 0.45, ease: 'power2.in'});
    gsap.delayedCall(1, () => this.maxPrice.set(false));
    gsap.to(this.slider.nativeElement, { xPercent: -50, duration: 0.8, delay: 0.7, ease: 'power2.inOut' });
  }

  protected readonly ButtonDirection = ButtonDirection;
  protected readonly ButtonSeverity = ButtonSeverity;
}
