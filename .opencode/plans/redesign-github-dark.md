# Rediseño Portfolio - GitHub Dark Theme

## Resumen

Rediseño completo del portafolio con paleta GitHub dark para máxima legibilidad y contraste WCAG AA.

## Paleta de Colores

| Variable           | Color     | Ratio | Uso                       |
| ------------------ | --------- | ----- | ------------------------- |
| `--bg-primary`     | `#0D1117` | —     | Fondo principal           |
| `--bg-secondary`   | `#161B22` | —     | Cards, contenedores       |
| `--bg-tertiary`    | `#21262D` | —     | Elementos elevados        |
| `--border-default` | `#30363D` | —     | Bordes, separadores       |
| `--accent-blue`    | `#58A6FF` | —     | Links, CTAs, acentos      |
| `--accent-cyan`    | `#39D2C0` | —     | Acentos secundarios       |
| `--accent-green`   | `#238636` | —     | Status, éxito             |
| `--accent-red`     | `#F85149` | —     | Errores, alertas          |
| `--accent-orange`  | `#D29922` | —     | Advertencias, MVP         |
| `--text-primary`   | `#F0F6FC` | 15:1  | Títulos, texto principal  |
| `--text-secondary` | `#C9D1D9` | 10:1  | Subtítulos, descripciones |
| `--text-tertiary`  | `#8B949E` | 5.5:1 | Labels, placeholders      |
| `--text-muted`     | `#6E7681` | 3.5:1 | Texto decorativo          |

## Cambios por Componente

### 1. Global (styles.css)

- Actualizar @theme con nueva paleta
- Cambiar body background a `#0D1117`
- Cambiar body color a `#F0F6FC`
- Actualizar filtros, pills, contact links, stack con nuevos colores
- Cambiar inner-glow-red a inner-glow-blue

### 2. Loading Page

- Background: `#0D1117`
- Title: `#F0F6FC`
- Checkpoints apagados: `#6E7681`
- Checkpoints encendidos: `#C9D1D9`
- Checkpoint activo: `#58A6FF`
- Progress bar: `#58A6FF`
- Progress info: `#8B949E`
- Skip button border: `#30363D`, text: `#8B949E`

### 3. Home Page

- Terminal preview bg: `#161B22`, border: `rgba(88, 166, 255, 0.3)`
- Terminal title: `#8B949E`
- Prompt text: `#58A6FF`
- Typed word: `#F0F6FC`
- Output line: `#C9D1D9`
- Title primary: `#58A6FF`
- Title secondary: `#F0F6FC`
- Subtitle: `#C9D1D9`
- Description: `#F0F6FC`
- Hint label: `#8B949E`
- Hint chips border: `rgba(88, 166, 255, 0.3)`
- Hint code: `#58A6FF`
- Popup bg: `#161B22`, border: `rgba(88, 166, 255, 0.3)`
- Popup text: `#C9D1D9`

### 4. Shell Sidebar

- Background: `#0D1117`
- Border: `#30363D`
- Section label: `#58A6FF`
- Avatar border: `rgba(88, 166, 255, 0.5)`
- Avatar glow: blue
- Operator ID: `#F0F6FC`
- Clearance text: `#C9D1D9`
- Comms links: `#C9D1D9`, hover: `#58A6FF`
- Email: `#D29922`, hover: `#F0F6FC`
- Footer bg: `rgba(22, 27, 34, 0.4)`

### 5. Terminal Bar

- Background: `#161B22`
- Border top: `#30363D`
- Feedback text: `#C9D1D9`
- Prompt text: `#58A6FF`
- Input text: `#F0F6FC`
- Placeholder: `#8B949E`
- Cursor: `#58A6FF`
- Help button: `#8B949E`, hover: `#58A6FF`
- Help overlay bg: `rgba(22, 27, 34, 0.97)`
- Help title: `#58A6FF`
- Help command: `#58A6FF`
- Help description: `#C9D1D9`

### 6. Feature Components

- Cards bg: `#161B22`
- Cards border: `#30363D`
- Section titles: `#58A6FF`
- Project tags: `#58A6FF` bg `rgba(88, 166, 255, 0.1)`
- Project status: `#238636` bg `rgba(35, 134, 54, 0.15)`
- Project MVP: `#D29922` bg `rgba(210, 153, 34, 0.15)`
- Project links: `#C9D1D9`, hover: `#58A6FF`
- Demo links: `#58A6FF`

## Archivos a Modificar

1. `src/styles.css` - Paleta global
2. `src/app/loading/loading.css` - Loading page
3. `src/app/home/home.css` - Home page
4. `src/app/shell/shell.css` - Sidebar
5. `src/app/terminal/terminal-bar/terminal-bar.css` - Terminal bar
6. `src/app/features/projects/projects.css` - Projects
7. `src/app/features/about/about.css` - About
8. `src/app/features/experience/experience.css` - Experience
9. `src/app/features/contact/contact.css` - Contact

## Criterios de Éxito

- [ ] Todos los textos pasan WCAG AA (4.5:1 mínimo)
- [ ] Paleta coherente en todos los componentes
- [ ] Sin opacidades arbitrarias - usar colores sólidos del sistema
- [ ] Acento azul `#58A6FF` solo para elementos interactivos
- [ ] Build exitoso
