// Terminal Interactive Logic
class Terminal {
  constructor() {
    this.input = document.getElementById('terminal-input');
    this.cursor = document.getElementById('terminal-cursor');
    this.archiveNav = document.getElementById('archive-nav');
    this.projectGrid = document.getElementById('project-grid');
    this.experienceGrid = document.getElementById('experience-grid');
    this.aboutContent = document.getElementById('about-content');
    this.contactContent = document.getElementById('contact-content');
    this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');

    // State
    this.currentSection = 'projects'; // Default view
    this.commandHistory = [];
    this.historyIndex = -1;

    // Data - will be populated from existing Angular components
    this.operatorData = {
      id: 'ARC-9921',
      clearance: 'O5-ALPHA',
      role: 'Full Stack Developer',
      bio: 'Desarrollador full stack especializado en aplicaciones web modernas, arquitectura de microservicios y DevOps. Experiencia en Angular, React, Node.js, Python y tecnologías cloud.',
      skills: [
        'Angular',
        'React',
        'Node.js',
        'Python',
        'AWS',
        'Docker',
        'Kubernetes',
        'TypeScript',
        'JavaScript',
        'HTML5',
        'CSS3',
      ],
    };

    this.experienceData = [
      {
        title: 'Google Cloud Fundamentals',
        category: 'Cloud',
        description: 'Fundamentos de infraestructura y despliegue de servicios.',
        icon: '☁️',
      },
      {
        title: 'Terraform IaC',
        category: 'IaC',
        description: 'Automatización y aprovisionamiento reproducible de entornos.',
        icon: '🔧',
      },
      {
        title: 'Docker Contenerización',
        category: 'Containers',
        description: 'Contenerización de apps backend y entorno de desarrollo.',
        icon: '🐳',
      },
      {
        title: 'AWS Certified Solutions Architect',
        category: 'Cloud',
        description: 'Diseño e implementación de sistemas escalables en AWS.',
        icon: '☁️',
      },
      {
        title: 'Kubernetes Administrator',
        category: 'Orchestration',
        description: 'Gestión de contenedores a escala con Kubernetes.',
        icon: '⚓',
      },
    ];

    this.projectsData = [
      {
        id: 'attendance-system',
        title: 'Attendance System',
        subtitle: 'Biometric sync engine for high-traffic environments.',
        icon: 'fingerprint',
        tech: ['FASTAPI_CORE', 'REDIS_BUFFER'],
        links: {
          execute: '#',
          logs: '#',
        },
      },
      {
        id: 'palette-id',
        title: 'Palette ID',
        subtitle: 'Computer vision engine for dynamic color extraction.',
        icon: 'palette',
        tech: ['K-MEANS_CV', 'PY_PROCESS'],
        links: {
          runExtract: '#',
        },
      },
      {
        id: 'auth-service',
        title: 'Auth Service',
        subtitle: 'JWT-based session management with granular RBAC.',
        icon: 'lock_open',
        tech: ['COV: 94%', 'LAT: 15ms'],
        links: {
          initGo: '#',
          infraPdf: '#',
        },
      },
      {
        id: 'node-redactor',
        title: 'Node Redactor',
        subtitle: 'Privacy-first automation for PII data masking.',
        icon: 'ink_eraser',
        tech: [],
        links: {
          maskData: '#',
        },
      },
      {
        id: 'grid-monitor',
        title: 'Grid Monitor',
        subtitle: 'Real-time packet visualization and analysis tool.',
        icon: 'monitoring',
        tech: [],
        links: {
          viewStream: '#',
        },
      },
      {
        id: 'log-parser',
        title: 'Log Parser',
        subtitle: 'Distributed log aggregation and search middleware.',
        icon: 'data_object',
        tech: [],
        links: {
          queryDb: '#',
        },
      },
    ];

    this.init();
  }

  init() {
    this.bindEvents();
    this.loadSections();
    this.focusInput();
    this.showHelp();
  }

  bindEvents() {
    // Terminal input events
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.executeCommand(this.input.value.trim());
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.navigateHistory(-1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.navigateHistory(1);
      }
    });

    // Cursor blink
    setInterval(() => {
      this.cursor.classList.toggle('blink');
    }, 500);

    // Mobile menu toggle
    if (this.mobileMenuToggle) {
      this.mobileMenuToggle.addEventListener('click', () => {
        document.querySelector('aside').classList.toggle('-translate-x-full');
      });
    }
  }

  loadSections() {
    // Populate archive navigation
    this.populateArchiveNav();

    // Populate project grid
    this.populateProjectGrid();

    // Populate experience grid
    this.populateExperienceGrid();

    // Populate about content
    this.populateAboutContent();

    // Populate contact content
    this.populateContactContent();
  }

  populateArchiveNav() {
    // Create navigation links for sections
    const sections = [
      { id: 'projects', label: 'PROJECTS_ARCHIVE', icon: '01' },
      { id: 'experience', label: 'CERTIFICATIONS', icon: '02' },
      { id: 'about', label: 'PERSONAL_DATA', icon: '03' },
      { id: 'contact', label: 'COMMS_LOG', icon: '04' },
    ];

    this.archiveNav.innerHTML = sections
      .map(
        (section) => `
      <a class="flex items-center gap-5 group transition-all py-3 px-4 hover:bg-highlight-red/5 rounded-sm" 
         href="#" data-section="${section.id}">
        <span class="text-highlight-red font-bold text-xl">${section.icon}</span>
        <span class="text-lg opacity-60 group-hover:opacity-100 group-hover:translate-x-2 transition-all tracking-tight">${section.label}</span>
      </a>
    `,
      )
      .join('');

    // Add click handlers to nav links
    this.archiveNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.getAttribute('data-section');
        this.switchSection(section);
        // Hide mobile menu on click
        if (this.mobileMenuToggle) {
          document.querySelector('aside').classList.add('-translate-x-full');
        }
      });
    });
  }

  populateProjectGrid() {
    this.projectGrid.innerHTML = this.projectsData
      .map(
        (project) => `
      <article class="punch-card bg-card-cream text-card-ink p-8 flex flex-col filing-shadow border-b-8 border-card-ink/5" id="${project.id}">
        <div class="flex justify-between items-start mb-8">
          <div>
            <span class="text-[10px] font-bold opacity-50 uppercase tracking-[0.2em] font-mono">${project.id.toUpperCase().charAt(0)}-${project.id.toUpperCase().charAt(1)}</span>
            <h2 class="text-2xl font-mono font-bold uppercase mt-1 leading-tight tracking-tighter">${project.title}</h2>
          </div>
          <div class="shrink-0 w-12 h-12 border border-card-ink/20 rounded flex items-center justify-center">
            <span class="material-symbols-outlined text-3xl text-card-ink/30">${project.icon}</span>
          </div>
        </div>
        <div class="flex-grow font-printer text-sm space-y-4">
          <p class="leading-relaxed border-l-2 border-highlight-red/40 pl-4 italic">
            "${project.subtitle}"
          </p>
          <div class="bg-card-ink/5 p-4 border border-dashed border-card-ink/10 text-xs">
            <div class="grid grid-cols-1 gap-1 font-bold">
              ${project.tech
                .map(
                  (tech) => `
                <span class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-highlight-red"></span> ${tech}</span>
              `,
                )
                .join('')}
            </div>
          </div>
        </div>
        <div class="mt-8 flex gap-3">
          ${Object.keys(project.links)
            .map((key) => {
              const label = key.replace(/([A-Z])/g, ' $1').toUpperCase();
              return `<a class="flex-1 bg-card-ink text-white py-3 text-center text-[10px] font-bold uppercase tracking-widest hover:bg-highlight-red transition-all" href="${project.links[key]}">${label}</a>`;
            })
            .join('')}
        </div>
        <div class="absolute bottom-0 left-0 right-0 h-3 perforated-edge opacity-20"></div>
      </article>
    `,
      )
      .join('');
  }

  populateExperienceGrid() {
    this.experienceGrid.innerHTML = this.experienceData
      .map(
        (exp) => `
      <article class="comic-card p-5">
        <p class="text-xs uppercase text-slate-300">${exp.category}</p>
        <h3 class="text-xl font-bold text-sky-300 mt-1">${exp.title}</h3>
        <p class="mt-2 text-sm text-slate-100">${exp.description}</p>
      </article>
    `,
      )
      .join('');
  }

  populateAboutContent() {
    this.aboutContent.innerHTML = `
      <div class="space-y-4">
        <div class="flex items-center gap-5">
          <span class="material-symbols-outiled text-[18px]">person</span>
          <div class="space-y-1">
            <div class="text-2xl font-bold font-mono text-card-cream tracking-tight">OPERATOR_ID: ${this.operatorData.id}</div>
            <div class="flex justify-center items-center gap-3">
              <span class="text-[11px] font-printer opacity-60 uppercase tracking-widest">Clearance: ${this.operatorData.clearance}</span>
            </div>
          </div>
        </div>
        
        <div class="border-t border-card-cream/10 pt-6">
          <h2 class="text-sm font-bold text-highlight-red uppercase mb-4 tracking-widest font-mono">OPERATOR_BIO</h2>
          <p class="leading-relaxed text-sm opacity-80">${this.operatorData.bio}</p>
        </div>
        
        <div class="border-t border-card-cream/10 pt-6">
          <h2 class="text-sm font-bold text-highlight-red uppercase mb-4 tracking-widest font-mono">TECH_STACK</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            ${this.operatorData.skills
              .map(
                (skill) => `
              <span class="bg-card-ink/20 px-3 py-1 rounded text-xs font-printer">${skill}</span>
            `,
              )
              .join('')}
          </div>
        </div>
      </div>
    `;
  }

  populateContactContent() {
    this.contactContent.innerHTML = `
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-lg">link</span>
          <span>GITHUB_REPO: <a class="text-highlight-orange hover:text-white underline" href="https://github.com/LondoDev" target="_blank">github.com/LondoDev</a></span>
        </div>
        
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-lg">link</span>
          <span>LINKEDIN: <a class="text-highlight-orange hover:text-white underline" href="https://linkedin.com/in/LondoDev" target="_blank">linkedin.com/in/LondoDev</a></span>
        </div>
        
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-lg">email</span>
          <span>CONTACT: <a class="text-highlight-orange hover:text-white underline" href="mailto:londedev@example.com">londedev@example.com</a></span>
        </div>
        
        <div class="pt-4 border-t border-card-cream/5">
          <p class="opacity-40 uppercase text-[10px] mb-2">System Info:</p>
          <div class="space-y-1 text-xs opacity-60">
            <span>Terminal v1.0.0</span>
            <span>Build: 2026.04.04</span>
            <span>Uptime: 0 days, 0 hours</span>
          </div>
        </div>
      </div>
    `;
  }

  executeCommand(command) {
    if (!command) return;

    // Add to history
    this.commandHistory.push(command);
    this.historyIndex = this.commandHistory.length;

    // Clear input
    this.input.value = '';

    // Show command in terminal (simulate output)
    const outputLine = document.createElement('div');
    outputLine.className = 'text-sm font-printer mb-2';
    outputLine.textContent = `OPERATOR@ARCHIVE:~$ ${command}`;
    this.input.parentNode.parentNode.appendChild(outputLine);

    // Process command
    let result = '';
    const args = command.split(' ');
    const cmd = args[0].toLowerCase();

    switch (cmd) {
      case 'help':
        result = this.showHelp();
        break;
      case 'whoami':
        result = this.whoami();
        break;
      case 'ls_experience':
        result = this.lsExperience();
        break;
      case 'ls_projects':
        result = this.lsProjects();
        break;
      case 'run_projects':
        result = this.runProjects(args[1]);
        break;
      case 'git_contrib':
        result = this.gitContrib();
        break;
      case 'sudo_rootwave':
        result = this.sudoRootwave();
        break;
      case 'clear':
        result = this.clearTerminal();
        break;
      case 'exit':
        result = this.exitTerminal();
        break;
      default:
        result = `Command not recognized: ${command}. Type 'help' for available commands.`;
    }

    // Show result
    if (result) {
      const resultLine = document.createElement('div');
      resultLine.className = 'text-sm font-printer opacity-80 mb-4';
      resultLine.textContent = result;
      this.input.parentNode.parentNode.appendChild(resultLine);
    }

    // Scroll to bottom
    this.scrollToBottom();
  }

  showHelp() {
    return `
Available Commands:
  help                    Show this help message
  whoami                  Display operator information
  ls_experience           List certifications and experience
  ls_projects             List available projects
  run_projects [id]       Run/execute specific project
  git_contrib             Show GitHub contribution statistics
  sudo_rootwave           Activate rootwave easter egg
  clear                   Clear terminal screen
  exit                    Minimize/close terminal interface
    `.trim();
  }

  whoami() {
    return `
OPERATOR_ID: ${this.operatorData.id}
CLEARANCE: ${this.operatorData.clearance}
ROLE: ${this.operatorData.role}
BIO: ${this.operatorData.bio}
    `.trim();
  }

  lsExperience() {
    return this.experienceData
      .map((exp) => `[${exp.category}] ${exp.title}: ${exp.description}`)
      .join('\n');
  }

  lsProjects() {
    return this.projectsData
      .map((project) => `[${project.id.toUpperCase()}] ${project.title} - ${project.subtitle}`)
      .join('\n');
  }

  runProjects(projectId) {
    if (!projectId) {
      return 'Please specify a project ID. Use "ls_projects" to see available projects.';
    }

    const project = this.projectsData.find((p) => p.id === projectId.toLowerCase());
    if (!project) {
      return `Project not found: ${projectId}. Use "ls_projects" to see available projects.`;
    }

    // Simulate project execution
    return `
Executing project: ${project.title}
${project.subtitle}
Status: INITIALIZING...
Loading modules: ${project.tech.join(', ')}
[OK] Project ${project.title} executed successfully.
Access logs: ${project.links.execute || 'logs not available'}
    `.trim();
  }

  gitContrib() {
    return `
GitHub Contributions for LondoDev:
  • Total commits: 1,247
  • Current streak: 16 days
  • Longest streak: 89 days
  • Contributions this year: 384
  • Primary languages: TypeScript (45%), JavaScript (30%), Python (15%), HTML/CSS (10%)
    `.trim();
  }

  sudoRootwave() {
    // Trigger easter egg effect
    document.body.classList.add('rootwave-active');
    setTimeout(() => {
      document.body.classList.remove('rootwave-active');
    }, 3000);

    return `
███╗   ███╗ █████╗ ███╗   ██╗███████╗
████╗ ████║██╔══██╗████╗  ██║██╔════╝
██╔████╔██║███████║██╔██╗ ██║███████╗
██║╚██╔╝██║██╔══██╗██║╚██╗██║╚════██║
██║ ╚═╝ ██║██║  ██║██║ ╚████║███████║
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝
ROOTWAVE PROTOCOL ACTIVATED
System override: SUCCESS
Access level: Ω-OMEGA
    `.trim();
  }

  clearTerminal() {
    // Clear all output lines except the command prompt
    const outputContainer = this.input.parentNode.parentNode;
    while (outputContainer.children.length > 3) {
      // Keep header, title, and input
      outputContainer.removeChild(outputContainer.lastChild);
    }
    return 'Terminal cleared.';
  }

  exitTerminal() {
    return 'Terminal interface minimized. Type any command to restore.';
  }

  switchSection(sectionId) {
    // Hide all sections
    const sections = ['projects', 'experience', 'about', 'contact'];
    sections.forEach((section) => {
      const element = document.getElementById(`${section}-section`);
      if (element) {
        element.classList.add('hidden');
      }
    });

    // Show selected section
    const selectedElement = document.getElementById(`${sectionId}-section`);
    if (selectedElement) {
      selectedElement.classList.remove('hidden');
    }

    // Update current section
    this.currentSection = sectionId;

    // Update nav highlighting
    this.archiveNav.querySelectorAll('a').forEach((link) => {
      if (link.getAttribute('data-section') === sectionId) {
        link.classList.add('bg-highlight-red/5');
      } else {
        link.classList.remove('bg-highlight-red/5');
      }
    });
  }

  focusInput() {
    this.input.focus();
  }

  navigateHistory(direction) {
    if (this.commandHistory.length === 0) return;

    this.historyIndex += direction;

    if (this.historyIndex < 0) {
      this.historyIndex = 0;
    } else if (this.historyIndex >= this.commandHistory.length) {
      this.historyIndex = this.commandHistory.length - 1;
    }

    this.input.value = this.commandHistory[this.historyIndex] || '';
  }

  scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.terminal = new Terminal();

  // Add rootwave easter egg styles
  const style = document.createElement('style');
  style.textContent = `
    .rootwave-active {
      animation: rootwavePulse 0.5s ease-in-out infinite alternate;
    }
    
    @keyframes rootwavePulse {
      from { filter: hue-rotate(0deg) saturate(1.2); }
      to { filter: hue-rotate(180deg) saturate(2); }
    }
    
    /* Blink cursor animation */
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    
    .blink {
      animation: blink 1s steps(2, start) infinite;
    }
  `;
  document.head.appendChild(style);
});
