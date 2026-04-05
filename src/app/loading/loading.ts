import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

type LoadingStage = {
  message: string;
};

const STAGES: LoadingStage[] = [
  { message: 'Cargando núcleo terminal...' },
  { message: 'Cargando interfaz de operador...' },
  { message: 'Cargando archivo de proyectos...' },
  { message: 'Cargando historial de experiencia...' },
  { message: 'Cargando módulos de comandos...' },
  { message: 'Finalizando inicialización...' },
  { message: 'Sistema listo' },
];

@Component({
  selector: 'app-loading',
  imports: [CommonModule],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class Loading implements OnInit, OnDestroy {
  readonly stages = STAGES;
  readonly totalStages = STAGES.length;
  readonly totalDuration = 4000;

  readonly progress = signal(0);
  readonly activeStage = signal(-1);

  readonly progressBarText = computed(() => {
    const p = this.progress();
    const filled = '='.repeat(Math.floor(p / 5));
    const empty = ' '.repeat(20 - Math.floor(p / 5));
    return `[${filled}${empty}]`;
  });

  readonly progressPercent = computed(() => `${Math.round(this.progress())}%`);

  private timeoutId: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startLoading();
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private startLoading(): void {
    const tickMs = 50;
    const increment = 100 / (this.totalDuration / tickMs);
    const stageThreshold = 100 / this.totalStages;

    const tick = () => {
      const currentProgress = this.progress();
      const newProgress = Math.min(currentProgress + increment, 100);
      this.progress.set(newProgress);

      const newActiveStage = Math.min(
        Math.floor(newProgress / stageThreshold),
        this.totalStages - 1,
      );

      this.activeStage.set(newActiveStage);

      if (newProgress >= 100) {
        setTimeout(() => this.router.navigate(['/whoami']), 300);
        return;
      }

      this.timeoutId = setTimeout(tick, tickMs);
    };

    this.timeoutId = setTimeout(tick, tickMs);
  }

  skip(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.router.navigate(['/whoami']);
  }
}
