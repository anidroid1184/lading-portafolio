import { Component, input } from '@angular/core';

export type MotifProject = {
  name: string;
  index: string;
  featured?: boolean;
  description: string;
  impact: string;
  /** Capabilidades clave visibles en la tarjeta (sin cambiar el layout global). */
  highlights?: string[];
  stack: string[];
  icon: string;
  accentColor: string;
  sourceUrl?: string;
  demoUrl?: string;
  screenshotUrl?: string;
};

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  readonly project = input.required<MotifProject>();
}
