# Apex Asset Management — Intermediate Angular Demos

Demo applications for the Angular Intermediate course.
Each app demonstrates 1-2 key concepts from its module.

## Setup
```bash
# npm
npm install

# pnpm
pnpm install
```

## Running a demo
```bash
# npm
npx nx serve demo-01-components

# pnpm
pnpm nx serve demo-01-components
```

| App | Key concepts demonstrated |
|-----|--------------------------|
| demo-01-components   | Smart/presentational split, ng-content, @Output |
| demo-02-directives   | Custom attribute directive, custom structural directive |
| demo-03-signals      | signal(), computed(), effect(), signal service |
| demo-04-lifecycle    | All 4 lifecycle hooks with visible sequencing |
| demo-05-di           | InjectionToken, component-level scope, useClass |
| demo-06-rxjs         | switchMap search, async pipe, toSignal |
| demo-07-state        | Signal-based shared state service |
| demo-08-routing      | Nested routes, lazy loading, functional guard |
| demo-09-forms        | Typed FormGroup, custom validator, FormArray |
| demo-10-performance  | OnPush vs Default, computed vs method call |
| demo-11-testing      | Component integration tests, HTTP service tests |
