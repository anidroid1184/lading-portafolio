import { Injectable } from '@angular/core';
import { TerminalCommand } from '../models/terminal-command.model';

@Injectable({
  providedIn: 'root',
})
export class TerminalCommandService {
  private commands: TerminalCommand[] = [];

  constructor() {
    this.initializeCommands();
  }

  private initializeCommands() {
    this.commands = [
      {
        name: 'help',
        description: 'Show available commands',
        execute: (args: string[]) => this.showHelp(args),
      },
      {
        name: '--help',
        description: 'Show available commands (alternative format)',
        execute: (args: string[]) => this.showHelp(args),
      },
      {
        name: 'whoami',
        description: 'Display operator information',
        execute: (args: string[]) => this.whoami(),
      },
      {
        name: 'ls_experience',
        description: 'List certifications and experience',
        execute: (args: string[]) => this.lsExperience(),
      },
      {
        name: 'ls_projects',
        description: 'List available projects',
        execute: (args: string[]) => this.lsProjects(),
      },
      {
        name: 'run_projects',
        description: 'Run/execute specific project',
        execute: (args: string[]) => this.runProjects(args[0]),
      },
      {
        name: 'git_contrib',
        description: 'Show GitHub contribution statistics',
        execute: (args: string[]) => this.gitContrib(),
      },
      {
        name: 'sudo_rootwave',
        description: 'Activate rootwave easter egg',
        execute: (args: string[]) => this.sudoRootwave(),
      },
      {
        name: 'clear',
        description: 'Clear terminal screen',
        execute: (args: string[]) => this.clearTerminal(),
      },
      {
        name: 'exit',
        description: 'Minimize/close terminal interface',
        execute: (args: string[]) => this.exitTerminal(),
      },
      {
        name: 'echo',
        description: 'Display a line of text',
        execute: (args: string[]) => this.echo(args),
      },
      {
        name: 'date',
        description: 'Display current date and time',
        execute: (args: string[]) => this.date(),
      },
      {
        name: 'time',
        description: 'Display current time',
        execute: (args: string[]) => this.time(),
      },
      {
        name: 'sysinfo',
        description: 'Display system information',
        execute: (args: string[]) => this.sysinfo(),
      },
    ];
  }

  getCommands(): TerminalCommand[] {
    return [...this.commands];
  }

  executeCommand(input: string): string {
    const parts = input.trim().split(/\s+/);
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    const command = this.commands.find((cmd) => cmd.name === commandName);
    if (!command) {
      return `Command not recognized: ${commandName}. Type 'help' for available commands.`;
    }

    try {
      return command.execute(args);
    } catch (error: any) {
      return `Error executing command: ${error.message}`;
    }
  }

  // Command implementations
  private showHelp(args: string[]): string {
    return `
Available Commands:
  help                    Show this help message
  --help                  Show available commands (alternative format)
  whoami                  Display operator information
  ls_experience           List certifications and experience
  ls_projects             List available projects
  run_projects [id]       Run/execute specific project
  git_contrib             Show GitHub contribution statistics
  sudo_rootwave           Activate rootwave easter egg
  clear                   Clear terminal screen
  exit                    Minimize/close terminal interface
  echo [text]             Display a line of text
  date                    Display current date and time
  time                    Display current time
  sysinfo                 Display system information
    `.trim();
  }

  private whoami(): string {
    // This would ideally get data from a service
    return `
OPERATOR_ID: ARC-9921
CLEARANCE: O5-ALPHA
ROLE: Full Stack Developer
BIO: Desarrollador full stack especializado en aplicaciones web modernas, arquitectura de microservicios y DevOps.
    `.trim();
  }

  private lsExperience(): string {
    // Placeholder - would get from experience service
    return `
[CLOUD] Google Cloud Fundamentals: Fundamentos de infraestructura y despliegue de servicios.
[IAC] Terraform IaC: Automatización y aprovisionamiento reproducible de entornos.
[CONTAINERS] Docker Contenerización: Contenerización de apps backend y entorno de desarrollo.
[AWS] AWS Certified Solutions Architect: Diseño e implementación de sistemas escalables en AWS.
[KUBERNETES] Kubernetes Administrator: Gestión de contenedores a escala con Kubernetes.
    `.trim();
  }

  private lsProjects(): string {
    // Placeholder - would get from projects service
    return `
[ATTENDANCE] Attendance System - Biometric sync engine for high-traffic environments.
[PALETTE] Palette ID - Computer vision engine for dynamic color extraction.
[AUTH] Auth Service - JWT-based session management with granular RBAC.
[NODEREDACTOR] Node Redactor - Privacy-first automation for PII data masking.
[GRIDMONITOR] Grid Monitor - Real-time packet visualization and analysis tool.
[LOGPARSER] Log Parser - Distributed log aggregation and search middleware.
    `.trim();
  }

  private runProjects(projectId: string | undefined): string {
    if (!projectId) {
      return 'Please specify a project ID. Use "ls_projects" to see available projects.';
    }

    const projectMap: { [key: string]: string } = {
      attendance: 'Attendance System',
      palette: 'Palette ID',
      auth: 'Auth Service',
      noderedactor: 'Node Redactor',
      gridmonitor: 'Grid Monitor',
      logparser: 'Log Parser',
    };

    const projectName = projectMap[projectId.toLowerCase()] || `Unknown project: ${projectId}`;
    return `
Executing project: ${projectName}
Status: INITIALIZING...
Loading modules...
[OK] Project ${projectName} executed successfully.
Access logs: logs/${projectId}.log
    `.trim();
  }

  private gitContrib(): string {
    return `
GitHub Contributions for LondoDev:
  • Total commits: 1,247
  • Current streak: 16 days
  • Longest streak: 89 days
  • Contributions this year: 384
  • Primary languages: TypeScript (45%), JavaScript (30%), Python (15%), HTML/CSS (10%)
    `.trim();
  }

  private sudoRootwave(): string {
    // In a real implementation, this would trigger visual effects
    return `
███╗   ███╗ █████╗ ███╗   ██╗███████╗
████╗ ████║██╔══██╗████╗  ██║██╔════╝
██╔████╔██║███████║██╔██╗ ██║███████╗
██║╚██╔╝██║██╔══██╗██║╚██╗██║╚════██║
██║ ╚═╝ ██║██║  ██║██║ ╚████║███████║
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═══╝╚═══╝╚═══╝
ROOTWAVE PROTOCOL ACTIVATED
System override: SUCCESS
Access level: Ω-OMEGA
    `.trim();
  }

  private clearTerminal(): string {
    return 'Terminal cleared.';
  }

  private exitTerminal(): string {
    return 'Terminal interface minimized. Type any command to restore.';
  }

  private echo(args: string[]): string {
    return args.join(' ') || '';
  }

  private date(): string {
    return new Date().toLocaleString();
  }

  private time(): string {
    return new Date().toLocaleTimeString();
  }

  private sysinfo(): string {
    return `
SYSTEM INFORMATION:
  OS: Web Terminal v1.0
  SHELL: /bin/bash
  TERM: xterm-256color
  USER: operator
  HOME: /home/operator
  LOCALE: en_US.UTF-8
  UPTIME: 0 days, 0 hours
    `.trim();
  }
}
