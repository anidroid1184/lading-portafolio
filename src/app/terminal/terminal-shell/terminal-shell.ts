import { Component } from '@angular/core';
import { TerminalCommandService } from '../services/terminal-command.service';
import { CommonModule } from '@angular/common';

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

  constructor(private terminalCommandService: TerminalCommandService) {
    this.showWelcome();
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
    if (result) {
      this.outputLines.push(result);
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
