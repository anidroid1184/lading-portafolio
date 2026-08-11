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
      name: 'Forge API',
      index: '001-A',
      featured: true,
      description:
        'API REST mid-level con FastAPI: JWT, CRUD con ownership, validación Pydantic y rate limiting.',
      impact:
        'Demuestra auth defensiva, autorización por recurso y tests adversariales de bypass.',
      stack: ['Python', 'FastAPI', 'JWT', 'Pydantic', 'Docker'],
      icon: 'api',
      accentColor: '#cc9a2e',
      sourceUrl: 'https://github.com/anidroid1184/forge-api',
      demoUrl: 'https://anidroid1184.github.io/forge-api/',
    },
    {
      name: 'Dispatch Q',
      index: '002-B',
      description:
        'Cola de tareas con reintentos, dead-letter e idempotencia (ARQ/Redis + fallback in-memory).',
      impact:
        'Patrones de resiliencia de worker: backoff, DLQ y claim atómico bajo concurrencia.',
      stack: ['Python', 'ARQ', 'Redis', 'FastAPI', 'asyncio'],
      icon: 'queue',
      accentColor: '#e8b840',
      sourceUrl: 'https://github.com/anidroid1184/dispatch-q',
      demoUrl: 'https://anidroid1184.github.io/dispatch-q/',
    },
    {
      name: 'Pipe Quality',
      index: '003-C',
      description:
        'Pipeline ETL con gates de calidad: schema drift, null rates, integridad y outliers.',
      impact:
        'Frena datos malos antes del load con reportes claros y fixtures adversariales.',
      stack: ['Python', 'ETL', 'SQLite', 'CLI', 'pytest'],
      icon: 'account_tree',
      accentColor: '#cc9a2e',
      sourceUrl: 'https://github.com/anidroid1184/pipe-quality',
      demoUrl: 'https://anidroid1184.github.io/pipe-quality/',
    },
    {
      name: 'Hook Relay',
      index: '004-D',
      description:
        'Webhooks event-driven con HMAC-SHA256, anti-replay, idempotencia y outbox transaccional.',
      impact:
        'Entrega confiable post-crash: firma verificada, eventos únicos y dispatcher con retries.',
      stack: ['Python', 'FastAPI', 'HMAC', 'Outbox', 'SQLite'],
      icon: 'hub',
      accentColor: '#b8943f',
      sourceUrl: 'https://github.com/anidroid1184/hook-relay',
      demoUrl: 'https://anidroid1184.github.io/hook-relay/',
    },
    {
      name: 'Pulse Obs',
      index: '005-E',
      description:
        'Servicio de referencia con health/ready, métricas Prometheus, logging JSON y hardening.',
      impact:
        'Listo para ops: fail-fast en producción, request_id, headers de seguridad y límites de body.',
      stack: ['Python', 'Prometheus', 'structlog', 'FastAPI', 'pydantic-settings'],
      icon: 'monitoring',
      accentColor: '#e8b840',
      sourceUrl: 'https://github.com/anidroid1184/pulse-obs',
      demoUrl: 'https://anidroid1184.github.io/pulse-obs/',
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
