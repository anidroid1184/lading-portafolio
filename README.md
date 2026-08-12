# LadingPortafolio

Portafolio personal (Angular) de Juan Sebastián Valencia Londoño. Landing con estética de consola de operador y sección de proyectos (embedded, demos en línea y experimentos Python).

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.1.

## Proyectos destacados

Orden en la landing (`#projects`): primero los maduros/en línea; al final los experimentos Python mid-level.

### Listos / en línea

| Proyecto | Resumen | Código | Demo |
| --- | --- | --- | --- |
| **Embedded Labs** | Lab visual de bits/máscaras (React + Rust Axum). | [repo](https://github.com/anidroid1184/embedded_labs) | [Pages](https://anidroid1184.github.io/embedded_labs/) |
| **OpsHub** | Consola operativa multi-rol (demo estática). | [repo](https://github.com/anidroid1184/opshub-demo) | [Pages](https://anidroid1184.github.io/opshub-demo/) |
| **Vía Transfer** | Estimador de transferencia vehicular (demo estática). | [repo](https://github.com/anidroid1184/via-transfer-demo) | [Pages](https://anidroid1184.github.io/via-transfer-demo/) |
| **AdLens** | Lectura de creativos publicitarios con mock. | [repo](https://github.com/anidroid1184/adlens-demo) | [Pages](https://anidroid1184.github.io/adlens-demo/) |

### Experimentos Python (al final)

| Proyecto | Resumen | Código | Demo |
| --- | --- | --- | --- |
| **Forge API** | API REST FastAPI con JWT, CRUD con ownership, Pydantic y rate limiting. | [repo](https://github.com/anidroid1184/forge-api) | [Pages](https://anidroid1184.github.io/forge-api/) |
| **Dispatch Q** | Cola de tareas con retries, backoff y DLQ; FastAPI + CLI sobre Redis/ARQ. | [repo](https://github.com/anidroid1184/dispatch-q) | [Pages](https://anidroid1184.github.io/dispatch-q/) |
| **Pipe Quality** | Pipeline ETL ingest → transform → validate → load con quality gates (CSV/JSON → SQLite). | [repo](https://github.com/anidroid1184/pipe-quality) | [Pages](https://anidroid1184.github.io/pipe-quality/) |
| **Hook Relay** | Relay de webhooks con HMAC, anti-replay, idempotencia y outbox. | [repo](https://github.com/anidroid1184/hook-relay) | [Pages](https://anidroid1184.github.io/hook-relay/) |
| **Pulse Obs** | Observabilidad de referencia: health/ready, Prometheus, structlog y config fail-fast. | [repo](https://github.com/anidroid1184/pulse-obs) | [Pages](https://anidroid1184.github.io/pulse-obs/) |

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
