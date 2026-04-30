import {
  AfterViewInit,
  Component,
  effect,
  ElementRef, inject,
  input,
  InputSignal,
  QueryList, ViewChild,
  ViewChildren
} from '@angular/core';
import {ProjectProps, ProjectTile} from '../../components/project-tile/project-tile';
import gsap from 'gsap';

@Component({
  selector: 'widget-realisations',
  imports: [
    ProjectTile
  ],
  templateUrl: './realisations.html'

})
export class Realisations implements AfterViewInit {
  realisations: ProjectProps[] = [
    {
      title: "SISTAR EDITIONS",
      description: "Autrices de la série PineapleXTea - 2026",
      links: [
        { name: "INSTAGRAM", url: "" },
        { name: "SITE INTERNET", url: "" },
      ]
    },
    {
      title: "SISTAR EDITIONS",
      description: "Autrices de la série PineapleXTea - 2026",
      links: [
        { name: "INSTAGRAM", url: "" },
        { name: "SITE INTERNET", url: "" },
      ]
    },
    {
      title: "SISTAR EDITIONS",
      description: "Autrices de la série PineapleXTea - 2026",
      links: [
        { name: "INSTAGRAM", url: "" },
        { name: "SITE INTERNET", url: "" },
      ]
    }
  ];
  isHeroMin:InputSignal<boolean> = input.required();
  viewInit:boolean = false;
  @ViewChildren(ProjectTile, { read: ElementRef }) tiles!: QueryList<ElementRef>;
  @ViewChild('line') line!: ElementRef;

  ngAfterViewInit(): void {
    this.viewInit = true;
  }

  constructor() {
    effect(() => {
      const isHeroMin = this.isHeroMin();
      if (isHeroMin && this.viewInit) {
        const timeline = gsap.timeline({defaults: {duration: 0.6, ease: "power2.out"}, delay: 2});
        timeline.to(this.line.nativeElement, {height: 'auto'});
        this.tiles.forEach((tile) => {
          timeline.fromTo(tile.nativeElement,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1 },
            "-=0.3"
          );
        });
      }
    });
  }

}
