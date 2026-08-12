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
      name: 'Embedded Labs',
      index: '001-A',
      featured: true,
      description:
        'Laboratorio visual open-source para aprender programación de bajo nivel: bits, máscaras, shifts y el camino hacia embedded/kernel.',
      highlights: [
        'Player gráfico de lecciones con animación de bits paso a paso',
        'API de lecciones y progreso (Rust Axum + Postgres)',
        'Stack local con Docker Compose',
        'Demo estática en GitHub Pages (progreso en localStorage)',
      ],
      impact:
        'Aprender haciendo: infraestructura real, frontend visual y contenido de lecciones extensible.',
      stack: ['React', 'TypeScript', 'Rust', 'Axum', 'Postgres', 'Docker'],
      icon: 'memory',
      accentColor: '#cc9a2e',
      sourceUrl: 'https://github.com/anidroid1184/embedded_labs',
      demoUrl: 'https://anidroid1184.github.io/embedded_labs/',
    },
    {
      name: 'OpsHub',
      index: '002-B',
      description:
        'Consola operativa multi-rol para dropshipping: login mock y dashboard por rol (CEO, supervisor, gestores, dropshipper).',
      highlights: [
        'UI estática de portafolio sin secretos ni API live',
        'Roles mock con narrativa y stats fixture',
        'Basada en producto FastAPI + JWT + Redis + Postgres',
        'Demo Pages lista para reclutadores',
      ],
      impact:
        'Muestra el look operativo multi-rol sin exponer el stack de producción del cliente.',
      stack: ['FastAPI', 'JWT', 'Redis', 'Postgres', 'HTML/CSS/JS'],
      icon: 'dashboard',
      accentColor: '#e8b840',
      sourceUrl: 'https://github.com/anidroid1184/opshub-demo',
      demoUrl: 'https://anidroid1184.github.io/opshub-demo/',
    },
    {
      name: 'Vía Transfer',
      index: '003-C',
      description:
        'Estimador de transferencia vehicular: formulario interactivo con cálculo fixture en el navegador.',
      highlights: [
        'UI del estimador sin login en Pages',
        'Cálculo local aproximado con fixtures',
        'Origen: FastAPI + JWT cookie + Redis + SQLite',
        'Demo Pages deployable sin backend',
      ],
      impact:
        'Demo interactiva del flujo de estimación sin hospedar API ni secretos.',
      stack: ['FastAPI', 'JWT', 'Redis', 'SQLite', 'HTML/CSS/JS'],
      icon: 'directions_car',
      accentColor: '#cc9a2e',
      sourceUrl: 'https://github.com/anidroid1184/via-transfer-demo',
      demoUrl: 'https://anidroid1184.github.io/via-transfer-demo/',
    },
    {
      name: 'AdLens',
      index: '004-D',
      description:
        'Lectura de creativos publicitarios con modo mock (JSON/PDF fixtures) end-to-end visual.',
      highlights: [
        'Prototype HTML/CSS/JS + fixtures mock',
        'Flujo Analizar creativo → resultado fixture',
        'Sin Apify/OpenAI en Pages (mock por defecto)',
        'Demo Pages lista para reclutadores',
      ],
      impact:
        'Demuestra el flujo de análisis de creativos sin keys ni backend live.',
      stack: ['FastAPI', 'HTML/CSS/JS', 'Mock fixtures'],
      icon: 'ad_group',
      accentColor: '#b8943f',
      sourceUrl: 'https://github.com/anidroid1184/adlens-demo',
      demoUrl: 'https://anidroid1184.github.io/adlens-demo/',
    },
    {
      name: 'Forge API',
      index: '005-E',
      description:
        'API REST con FastAPI: autenticación JWT, CRUD con ownership por recurso, validación Pydantic y rate limiting.',
      highlights: [
        'JWT access/refresh y rutas protegidas',
        'CRUD con ownership: solo el dueño muta su recurso',
        'Validación Pydantic end-to-end',
        'Rate limiting para abuso y noise',
      ],
      impact:
        'Auth defensiva y autorización por recurso; evidencia de API mid-level lista para demos y revisión de código.',
      stack: ['Python', 'FastAPI', 'JWT', 'Ownership', 'Rate limit', 'Pydantic'],
      icon: 'api',
      accentColor: '#cc9a2e',
      sourceUrl: 'https://github.com/anidroid1184/forge-api',
      demoUrl: 'https://anidroid1184.github.io/forge-api/',
    },
    {
      name: 'Dispatch Q',
      index: '006-F',
      description:
        'Cola de tareas con retries, backoff exponencial y DLQ. API FastAPI + CLI sobre Redis/ARQ (con fallback in-memory).',
      highlights: [
        'Retries con backoff ante fallos transitorios',
        'Dead-letter queue (DLQ) para jobs irrecuperables',
        'API FastAPI y CLI para encolar/inspeccionar',
        'Worker ARQ/Redis con claim seguro bajo concurrencia',
      ],
      impact:
        'Patrones de resiliencia de workers: reintentos controlados, DLQ e idempotencia operativa.',
      stack: ['Python', 'FastAPI', 'ARQ', 'Redis', 'Retries', 'DLQ', 'CLI'],
      icon: 'queue',
      accentColor: '#e8b840',
      sourceUrl: 'https://github.com/anidroid1184/dispatch-q',
      demoUrl: 'https://anidroid1184.github.io/dispatch-q/',
    },
    {
      name: 'Pipe Quality',
      index: '007-G',
      description:
        'Pipeline ETL ingest → transform → validate → load con quality gates. Entrada CSV/JSON hacia SQLite.',
      highlights: [
        'Flujo ingest → transform → validate → load',
        'Quality gates: schema, null rates, integridad',
        'Fuentes CSV/JSON con reportes de rechazo',
        'Persistencia SQLite y CLI reproducible',
      ],
      impact:
        'Detiene datos malos antes del load; gates de calidad accionables para pipelines reales.',
      stack: ['Python', 'ETL', 'Quality gates', 'CSV/JSON', 'SQLite', 'CLI'],
      icon: 'account_tree',
      accentColor: '#cc9a2e',
      sourceUrl: 'https://github.com/anidroid1184/pipe-quality',
      demoUrl: 'https://anidroid1184.github.io/pipe-quality/',
    },
    {
      name: 'Hook Relay',
      index: '008-H',
      description:
        'Relay de webhooks con verificación HMAC, anti-replay, idempotencia y outbox para entrega confiable.',
      highlights: [
        'Firma HMAC y rechazo de payloads inválidos',
        'Anti-replay por ventana temporal / nonce',
        'Idempotencia de eventos recibidos',
        'Outbox para reenvío post-crash',
      ],
      impact:
        'Entrega event-driven confiable: firma verificada, eventos únicos y dispatcher con reintentos.',
      stack: ['Python', 'FastAPI', 'HMAC', 'Anti-replay', 'Idempotencia', 'Outbox'],
      icon: 'hub',
      accentColor: '#b8943f',
      sourceUrl: 'https://github.com/anidroid1184/hook-relay',
      demoUrl: 'https://anidroid1184.github.io/hook-relay/',
    },
    {
      name: 'Pulse Obs',
      index: '009-I',
      description:
        'Servicio de observabilidad de referencia: health/ready, métricas Prometheus, structlog y config fail-fast.',
      highlights: [
        'Endpoints /health y /ready para orquestación',
        'Métricas Prometheus exportables',
        'Logging estructurado con structlog',
        'Config fail-fast: arranque seguro en producción',
      ],
      impact:
        'Base ops-ready: señales de vida, telemetría y endurecimiento de arranque sin sorpresas en runtime.',
      stack: ['Python', 'FastAPI', 'Prometheus', 'structlog', 'Health/Ready', 'Fail-fast'],
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
