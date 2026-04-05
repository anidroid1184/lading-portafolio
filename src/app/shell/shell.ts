import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TerminalBar } from '../terminal/terminal-bar/terminal-bar';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, TerminalBar],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell {
  avatarUrl = 'avatar.jpeg';
}
