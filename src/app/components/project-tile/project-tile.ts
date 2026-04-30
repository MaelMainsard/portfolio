import {Component, Input} from '@angular/core';

export interface LinkProps {
  name: string;
  url: string;
}

export interface ProjectProps {
  title: string;
  description: string;
  links: LinkProps[];
}

@Component({
  selector: 'components-project-tile',
  imports: [],
  templateUrl: './project-tile.html'
})
export class ProjectTile {
  @Input({required: true}) data!: ProjectProps;
}
