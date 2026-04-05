import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TerminalCommandService } from '../terminal/services/terminal-command.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '400ms cubic-bezier(0.16, 1, 0.3, 1)',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
    ]),
  ],
})
export class Home implements OnInit, OnDestroy {
  showTypedText = false;
  showOutput = false;
  showHint = false;
  private timeoutIds: any[] = [];

  constructor(
    private router: Router,
    private terminalCommandService: TerminalCommandService,
  ) {}

  ngOnInit(): void {
    // Typing animation sequence
    this.timeoutIds.push(
      setTimeout(() => {
        this.showTypedText = true;
      }, 600),
    );
    this.timeoutIds.push(
      setTimeout(() => {
        this.showOutput = true;
      }, 1800),
    );
    this.timeoutIds.push(
      setTimeout(() => {
        this.showHint = true;
      }, 2500),
    );
  }

  ngOnDestroy(): void {
    this.timeoutIds.forEach((id) => clearTimeout(id));
  }

  executeCommand(command: string): void {
    this.terminalCommandService.executeCommand(command);
  }

  dismissHint(): void {
    this.showHint = false;
  }
}
