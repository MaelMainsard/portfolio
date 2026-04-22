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
import {ButtonType, CodeButton} from '../../components/code-button/code-button';
import {PriceCard, PriceCardProps} from '../../components/price-card/price-card';
import {Contact} from '../contact/contact';

@Component({
  selector: 'widget-price',
  imports: [
    CodeButton,
    PriceCard,
    Contact
  ],
  templateUrl: './price.html'

})
export class Price implements AfterViewInit {
  @ViewChild("slider") slider!: ElementRef;
  protected readonly ButtonType = ButtonType;

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

  maxPrice: ModelSignal<boolean> = model<boolean>(false);
  triggerEnterAnimation = signal<boolean>(false)
  showContact = signal<boolean>(false);

  injector = inject(Injector);

  constructor() {
    effect(() => {
      if (!this.showContact()) {
        afterNextRender(() => {
          gsap.fromTo("#card-starter",  {opacity: 0, y: -100}, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
          gsap.fromTo("#card-studio",  {opacity: 0, y: 100}, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
          gsap.fromTo("#card-premium", {opacity: 0, y: -100}, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
        }, { injector: this.injector });
      }
    });
  }

  ngAfterViewInit(): void {
    gsap.set(this.slider.nativeElement, { xPercent: -50 });
  }

  onCardClick(card: PriceCardProps): void {
    this.pickedCard = card;
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
    gsap.fromTo("#card-premium", { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: 0.6, delay: 1.0, ease: 'power2.out' });
  }


  onComeBackClick(): void {
    gsap.to("#card-starter", { opacity: 0, y: -100, duration: 0.4, delay: 0, ease: 'power2.in' });
    gsap.to("#card-studio", { opacity: 0, y: 100, duration: 0.4, delay: 0.15, ease: 'power2.in' });
    gsap.to("#card-premium", { opacity: 0, y: -100, duration: 0.4, delay: 0.3, ease: 'power2.in', onComplete:()=>{
        this.maxPrice.set(false);
    }});
    gsap.to(this.slider.nativeElement, { xPercent: -50, duration: 0.8, delay: 0.7, ease: 'power2.inOut' });
  }

}
