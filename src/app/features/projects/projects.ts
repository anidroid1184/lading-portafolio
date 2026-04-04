import { Component, computed, signal } from '@angular/core';

type ProjectCategory = 'all' | 'backend' | 'python' | 'go';

type ProjectItem = {
  name: string;
  status: 'En Producción' | 'MVP';
  featured?: boolean;
  description: string;
  impact: string;
  category: Exclude<ProjectCategory, 'all'>;
  stack: string[];
  visualType: 'terminal' | 'mermaid';
  visualSnippet: string;
  sourceUrl: string;
  demoUrl?: string;
};

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  readonly filters: ProjectCategory[] = ['all', 'backend', 'python', 'go'];

  readonly activeFilter = signal<ProjectCategory>('all');

  readonly projects = signal<ProjectItem[]>([
    {
      name: 'Attendance System',
      status: 'En Producción',
      featured: true,
      description: 'Sistema de control de asistencia con API y gestión de registros.',
      impact: 'Optimicé consultas de asistencia reduciendo la latencia de respuesta en un 40%.',
      category: 'backend',
      stack: ['FastAPI', 'Redis', 'PostgreSQL', 'Docker'],
      visualType: 'mermaid',
      visualSnippet: 'Students --> AttendanceAPI --> PostgreSQL',
      sourceUrl: 'https://github.com',
      demoUrl: 'https://example.com',
    },
    {
      name: 'Color Palette Identifier',
      status: 'MVP',
      description: 'Identificación de paletas desde imágenes para análisis visual.',
      impact: 'Reduje el tiempo de extracción de paleta para prototipos de branding visual.',
      category: 'python',
      stack: ['Python', 'OpenCV', 'FastAPI'],
      visualType: 'terminal',
      visualSnippet: '$ python palette.py --image sample.jpg',
      sourceUrl: 'https://github.com',
    },
    {
      name: 'User Management in Go',
      status: 'MVP',
      description: 'Gestión de usuarios y roles con enfoque en rendimiento.',
      impact: 'Diseñé RBAC simple y mantenible para acelerar el desarrollo de nuevas features.',
      category: 'go',
      stack: ['Go', 'REST', 'JWT', 'PostgreSQL'],
      visualType: 'terminal',
      visualSnippet: '$ go run cmd/server/main.go',
      sourceUrl: 'https://github.com',
    },
  ]);

  readonly filteredProjects = computed(() => {
    const selected = this.activeFilter();
    const all = this.projects();
    if (selected === 'all') {
      return all;
    }
    if (selected === 'backend') {
      return all.filter((project) => project.category === 'backend' || project.category === 'python' || project.category === 'go');
    }
    return all.filter((project) => project.category === selected);
  });

  setFilter(filter: ProjectCategory): void {
    this.activeFilter.set(filter);
  }

  labelFor(filter: ProjectCategory): string {
    if (filter === 'all') {
      return 'Todos';
    }
    if (filter === 'backend') {
      return 'Backend';
    }
    if (filter === 'python') {
      return 'Python';
    }
    return 'Golang';
  }
}
