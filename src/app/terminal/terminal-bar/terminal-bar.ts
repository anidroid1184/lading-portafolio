import { Component } from '@angular/core';
import { TerminalCommandService } from '../services/terminal-command.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terminal-bar',
  imports: [CommonModule],
  templateUrl: './terminal-bar.html',
  styleUrl: './terminal-bar.css',
})
export class TerminalBar {
  inputValue = '';

  constructor(readonly terminalCommandService: TerminalCommandService) {}

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.executeCommand(this.inputValue.trim());
      this.inputValue = '';
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.inputValue = this.terminalCommandService.navigateHistory(-1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.inputValue = this.terminalCommandService.navigateHistory(1);
    }
  }

  executeCommand(command: string) {
    this.terminalCommandService.executeCommand(command);
  }

  toggleHelp() {
    this.terminalCommandService.isHelpVisible.update((v) => !v);
  }
}
