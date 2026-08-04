import { Component, inject, AfterViewInit, OnDestroy, signal, effect } from '@angular/core';
import { ProjectCard, type MotifProject } from '../shared/components/project-card/project-card';
import { I18nService } from '../core/services/i18n/i18n.service';
import { TerminalCommandService } from '../terminal/services/terminal-command.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TerminalBar } from '../terminal/terminal-bar/terminal-bar';

@Component({
  selector: 'app-home',
  imports: [ProjectCard, ReactiveFormsModule, TerminalBar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnDestroy {
  readonly i18n = inject(I18nService);
  private _fb = inject(FormBuilder);
  private _observer?: IntersectionObserver;
  private _cmdService = inject(TerminalCommandService);

  readonly sidebarOpen = signal(false);
  readonly avatarUrl = 'avatar.jpeg';
  readonly submitted = signal(false);
  showSidebarHint = false;
  private _hintTimeout?: ReturnType<typeof setTimeout>;

  readonly form = this._fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  readonly projects: MotifProject[] = [
    {
      name: 'Attendance System',
      index: '001-A',
      featured: true,
      description: 'Sistema de control de asistencia con API REST y gestión de registros.',
      impact: 'Optimicé consultas de asistencia reduciendo la latencia de respuesta en un 40%.',
      stack: ['FastAPI', 'Redis', 'PostgreSQL', 'Docker'],
      icon: 'fingerprint',
      accentColor: '#cc9a2e',
    },
    {
      name: 'Palette ID',
      index: '002-B',
      description: 'Identificación de paletas desde imágenes para análisis visual.',
      impact: 'Reduje el tiempo de extracción de paleta para prototipos de branding visual.',
      stack: ['Python', 'OpenCV', 'FastAPI'],
      icon: 'palette',
      accentColor: '#e8b840',
    },
    {
      name: 'Auth Service',
      index: '003-C',
      description: 'Microservicio de autenticación con JWT y RBAC granular.',
      impact: 'Diseñé RBAC simple y mantenible para acelerar el desarrollo de nuevas features.',
      stack: ['Go', 'REST', 'JWT', 'PostgreSQL'],
      icon: 'lock',
      accentColor: '#cc9a2e',
    },
    {
      name: 'Node Redactor',
      index: '004-D',
      description: 'Automatización de enmascaramiento de datos PII con procesamiento en streaming.',
      impact: 'Eliminé riesgo de exposición de datos sensibles en pipelines de logging.',
      stack: ['Go', 'Kafka', 'Redis'],
      icon: 'ink_eraser',
      accentColor: '#b8943f',
    },
    {
      name: 'Grid Monitor',
      index: '005-E',
      description: 'Dashboard de visualización y análisis de paquetes de red en tiempo real.',
      impact: 'Reduje el tiempo de diagnóstico de incidencias de red en un 60%.',
      stack: ['Python', 'WebSocket', 'D3.js'],
      icon: 'monitoring',
      accentColor: '#cc9a2e',
    },
    {
      name: 'Log Parser',
      index: '006-F',
      description: 'Middleware de agregación y búsqueda de logs distribuidos.',
      impact: 'Centralicé +500GB diarios de logs con queries sub-100ms.',
      stack: ['Go', 'Elasticsearch', 'gRPC'],
      icon: 'data_object',
      accentColor: '#e8b840',
    },
  ];

  constructor() {
    effect(() => {
      const target = this._cmdService.scrollTarget();
      if (target) this.scrollTo(target);
    });
  }

  ngAfterViewInit(): void {
    const grid = document.querySelector('.motifs-grid');
    if (grid) {
      const children = Array.from(grid.children) as HTMLElement[];
      this._observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const host = entry.target as HTMLElement;
            if (entry.isIntersecting) host.classList.add('motif-visible');
            else host.classList.remove('motif-visible');
          }
        },
        { threshold: 0.15 },
      );
      children.forEach((child, i) => {
        child.style.setProperty('--slide-from', i % 2 === 0 ? '-40px' : '40px');
        this._observer!.observe(child);
      });
    }
    this._hintTimeout = setTimeout(() => {
      this.showSidebarHint = true;
    }, 4000);
  }

  ngOnDestroy(): void {
    this._observer?.disconnect();
    clearTimeout(this._hintTimeout);
  }

  dismissSidebarHint(): void {
    this.showSidebarHint = false;
  }

  scrollTo(target: string): void {
    if (target === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.querySelector('#' + target)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const { name, email, message } = this.form.value;
    const body = encodeURIComponent(message ?? '');
    const mailto = `mailto:valencialondonojuansebastian@gmail.com?subject=Portafolio - ${encodeURIComponent(name ?? '')}&body=${body}%0A%0A— ${name} (${email})`;
    window.location.href = mailto;
    this.submitted.set(true);
    this.form.reset();
  }

  toggleLang(): void {
    this.i18n.toggle();
  }

  toggleSidebar(): void {
    this.showSidebarHint = false;
    this.sidebarOpen.update((v) => !v);
  }
}
