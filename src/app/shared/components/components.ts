import { Component } from '@angular/core';

type StackLayer = {
  layer: string;
  title: string;
  subtitle: string;
  repoUrl: string;
};

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [],
  templateUrl: './components.html',
  styleUrl: './components.css',
})
export class Components {
  readonly stack: StackLayer[] = [
    {
      layer: 'Core',
      title: 'Python',
      subtitle: 'FastAPI · Django · APIs de negocio',
      repoUrl: 'https://github.com',
    },
    {
      layer: 'Core',
      title: 'Go',
      subtitle: 'Concurrency · Microservices',
      repoUrl: 'https://github.com',
    },
    {
      layer: 'Data & Infra',
      title: 'PostgreSQL',
      subtitle: 'Data Modeling · Query optimization',
      repoUrl: 'https://github.com',
    },
    {
      layer: 'Data & Infra',
      title: 'Docker · Terraform',
      subtitle: 'Cloud-native environments',
      repoUrl: 'https://github.com',
    },
    {
      layer: 'The Glue',
      title: 'JavaScript · TypeScript',
      subtitle: 'Integración backend/frontend',
      repoUrl: 'https://github.com',
    },
  ];
}
