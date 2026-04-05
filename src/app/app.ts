import { Component, signal } from '@angular/core';
import { TerminalShell } from './terminal/terminal-shell/terminal-shell';

@Component({
  selector: 'app-root',
  imports: [TerminalShell],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('lading-portafolio');
}
