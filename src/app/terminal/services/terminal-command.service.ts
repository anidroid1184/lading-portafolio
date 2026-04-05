import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

export type CommandResult = {
  type: 'navigate' | 'message' | 'error';
  message?: string;
  route?: string;
};

@Injectable({
  providedIn: 'root',
})
export class TerminalCommandService {
  readonly commandHistory = signal<string[]>([]);
  readonly historyIndex = signal<number>(-1);
  readonly lastFeedback = signal<string>('');
  readonly isHelpVisible = signal<boolean>(false);

  readonly availableCommands = [
    { name: 'whoami', description: 'Sobre mí', route: '/whoami' },
    { name: 'projects', description: 'Proyectos', route: '/projects' },
    { name: 'experience', description: 'Experiencia', route: '/experience' },
    { name: 'contact', description: 'Contacto', route: '/contact' },
    { name: 'help', description: 'Mostrar comandos disponibles', route: null },
    { name: 'clear', description: 'Limpiar feedback', route: null },
  ];

  constructor(private router: Router) {}

  executeCommand(input: string): CommandResult {
    const trimmed = input.trim();
    if (!trimmed) {
      return { type: 'message', message: '' };
    }

    // Add to history
    this.commandHistory.update((history) => [...history, trimmed]);
    this.historyIndex.set(this.commandHistory().length);
    this.isHelpVisible.set(false);

    const parts = trimmed.split(/\s+/);
    const commandName = parts[0].toLowerCase();

    const result = this.resolveCommand(commandName, parts.slice(1));

    if (result.type === 'navigate' && result.route) {
      this.lastFeedback.set(`> ${trimmed} → navigating...`);
      this.router.navigate([result.route]);
    } else if (result.type === 'message') {
      this.lastFeedback.set(result.message || '');
    } else if (result.type === 'error') {
      this.lastFeedback.set(
        result.message || 'Command not found. Type "help" for available commands.',
      );
    }

    return result;
  }

  private resolveCommand(name: string, _args: string[]): CommandResult {
    const navigationMap: Record<string, string> = {
      whoami: '/whoami',
      projects: '/projects',
      experience: '/experience',
      contact: '/contact',
      // Legacy commands for backwards compatibility
      ls_projects: '/projects',
      ls_experience: '/experience',
    };

    if (navigationMap[name]) {
      return { type: 'navigate', route: navigationMap[name] };
    }

    switch (name) {
      case 'help':
      case '--help':
        this.isHelpVisible.set(true);
        return {
          type: 'message',
          message: 'Available commands: whoami, projects, experience, contact, help, clear',
        };

      case 'clear':
        this.lastFeedback.set('');
        return { type: 'message', message: '' };

      case 'date':
        return { type: 'message', message: new Date().toLocaleString() };

      case 'time':
        return { type: 'message', message: new Date().toLocaleTimeString() };

      case 'sysinfo':
        return {
          type: 'message',
          message: 'Web Terminal v2.0 // Angular 21 // Portafolio',
        };

      case 'echo':
        return { type: 'message', message: _args.join(' ') || '' };

      default:
        return {
          type: 'error',
          message: `Command not found: ${name}. Type "help" for available commands.`,
        };
    }
  }

  navigateHistory(direction: number): string {
    const history = this.commandHistory();
    if (history.length === 0) return '';

    const newIndex = this.historyIndex() + direction;
    const clampedIndex = Math.max(0, Math.min(newIndex, history.length - 1));

    this.historyIndex.set(clampedIndex);
    return history[clampedIndex] || '';
  }
}
