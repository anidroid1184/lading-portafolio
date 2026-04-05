import { Component } from '@angular/core';
import { TerminalCommandService } from '../services/terminal-command.service';
import { CommonModule } from '@angular/common';

interface LoadingStage {
  message: string;
  progress: number;
}

@Component({
  selector: 'app-terminal-shell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminal-shell.html',
  styleUrl: './terminal-shell.css',
})
export class TerminalShell {
  inputValue = '';
  outputLines: string[] = [];
  commandHistory: string[] = [];
  historyIndex = -1;
  isRootwaveActive = false;

  // Loading system
  isLoading = true;
  loadingProgress = 0;
  loadingMessage = 'Inicializando Sistema...';
  loadingStages: LoadingStage[] = [
    { message: 'Cargando núcleo terminal...', progress: 10 },
    { message: 'Cargando interfaz de operador...', progress: 25 },
    { message: 'Cargando archivo de proyectos...', progress: 40 },
    { message: 'Cargando historial de experiencia...', progress: 60 },
    { message: 'Cargando módulos de comandos...', progress: 75 },
    { message: 'Finalizando inicialización...', progress: 90 },
    { message: 'Sistema listo', progress: 100 },
  ];
  currentStageIndex = 0;

  constructor(private terminalCommandService: TerminalCommandService) {
    this.startLoadingSequence();
  }

  startLoadingSequence() {
    // Simulate loading process
    const loadNextStage = () => {
      if (this.currentStageIndex < this.loadingStages.length) {
        const stage = this.loadingStages[this.currentStageIndex];
        this.loadingMessage = stage.message;
        this.loadingProgress = stage.progress;

        // Add visual feedback to output
        this.outputLines = [
          `> ${this.loadingMessage}`,
          `[${'='.repeat(Math.floor(this.loadingProgress / 5))}${' '.repeat(20 - Math.floor(this.loadingProgress / 5))}] ${this.loadingProgress}%`,
          '',
        ];

        this.currentStageIndex++;

        // Continue to next stage after delay
        setTimeout(loadNextStage, 800);
      } else {
        // Loading complete, show welcome
        setTimeout(() => {
          this.isLoading = false;
          this.showWelcome();
        }, 500);
      }
    };

    loadNextStage();
  }

  getProgressBar(): string {
    const filled = '='.repeat(Math.floor(this.loadingProgress / 5));
    const empty = ' '.repeat(20 - Math.floor(this.loadingProgress / 5));
    return `${filled}${empty}`;
  }

  showWelcome() {
    this.outputLines = ['TERMINAL_READY', 'AWAITING_COMMAND_INPUT...', '', 'OPERATOR@ARCHIVE:~$ '];
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.executeCommand(this.inputValue.trim());
      this.inputValue = '';
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.navigateHistory(-1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.navigateHistory(1);
    }
  }

  executeCommand(command: string) {
    if (!command) return;

    // Add to history
    this.commandHistory.push(command);
    this.historyIndex = this.commandHistory.length;

    // Show command in output
    this.outputLines.push(`OPERATOR@ARCHIVE:~$ ${command}`);

    // Process command
    const result = this.terminalCommandService.executeCommand(command);
    if (result && result.message) {
      // Split multi-line output into separate lines for better display
      const lines = result.message.split('\n');
      lines.forEach((line: string) => {
        if (line.trim() !== '') {
          this.outputLines.push(line);
        }
      });
      // Add empty line after command output for spacing
      this.outputLines.push('');
    }

    // Check for rootwave easter egg
    if (command === 'sudo_rootwave') {
      this.isRootwaveActive = true;
      setTimeout(() => {
        this.isRootwaveActive = false;
      }, 3000);
    }
  }

  navigateHistory(direction: number) {
    if (this.commandHistory.length === 0) return;

    this.historyIndex += direction;

    if (this.historyIndex < 0) {
      this.historyIndex = 0;
    } else if (this.historyIndex >= this.commandHistory.length) {
      this.historyIndex = this.commandHistory.length - 1;
    }

    this.inputValue = this.commandHistory[this.historyIndex] || '';
  }

  clearTerminal() {
    this.outputLines = ['TERMINAL_READY', 'AWAITING_COMMAND_INPUT...', '', 'OPERATOR@ARCHIVE:~$ '];
    this.commandHistory = [];
    this.historyIndex = -1;
    this.inputValue = '';
  }
}
