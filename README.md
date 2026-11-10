# RockSEC

### Cybersecurity consulting workflows for students and local businesses

RockSEC explores how a university cybersecurity program could coordinate student consultants, faculty oversight, and security assessments for community businesses. It combines a React interface with an AWS Amplify data model for clients, findings, reports, and activity records.

**Status: educational prototype.** The repository demonstrates application structure, assessment interfaces, and data access patterns. Authentication, authorization, and several workflows remain demonstration implementations.

[Explore the code](src) · [Assessment workflow](src/pages/BusinessAssessment.tsx) · [Data schema](amplify/data/resource.ts) · [Local setup](#local-setup)

## The problem

Student consulting programs need a shared place to organize engagements: who is working with each business, what was assessed, which recommendations need review, and how results are communicated. RockSEC models that workflow through consultant and administrator interfaces.

## What is in the repository

| Area | Implementation |
| --- | --- |
| Business assessment | A multistep questionnaire covering business context, security maturity, staffing, and threat concerns, with a rule-based illustrative risk score. |
| Consultant workspace | Dashboard, assessment, history, learning, and threat information routes. |
| Administrator workspace | Pages for clients, consultants, users, reports, programs, activity logs, and security settings. |
| Dashboard reporting | React chart and table components, API-backed statistics in the administrator dashboard, and sample data fallbacks. |
| Data model | Typed Amplify models for users, consultants, clients, threats, systems, scan records, metrics, reports, approvals, and logs. |
| Data access | Service modules for model operations and API wrappers for response handling and activity logging. |

The threat information and report screens include sample content. The scan service manages scan records and their status; it does not run a vulnerability scanner.

## Start with these files

| File | What to inspect |
| --- | --- |
| [`src/App.tsx`](src/App.tsx) | Route composition, administrator and consultant layouts, and client-side route checks. |
| [`src/pages/BusinessAssessment.tsx`](src/pages/BusinessAssessment.tsx) | Form state, step progression, and illustrative scoring logic. |
| [`amplify/data/resource.ts`](amplify/data/resource.ts) | The domain schema and current authorization configuration. |
| [`src/backend/services`](src/backend/services) | CRUD operations and aggregation helpers around the generated data client. |
| [`src/backend/api`](src/backend/api) | Response wrappers and the application-facing API layer. |
| [`src/pages/AdminDashboardV2.tsx`](src/pages/AdminDashboardV2.tsx) | Loading data, handling errors, and assembling dashboard views. |
| [`src/context/AuthContext.tsx`](src/context/AuthContext.tsx) | Demo session state and role selection. |

## Technology

| Layer | Tools |
| --- | --- |
| Interface | React 18, TypeScript, Material UI |
| Navigation and charts | React Router, Recharts |
| Build tooling | Vite, TypeScript, ESLint |
| Backend definitions | AWS Amplify Gen 2 |
| Data access | Amplify Data / GraphQL |
| Authentication scaffold | Amplify Auth resource; the current interface uses a separate demo login |

The modules under `src/backend/` are imported by the frontend. They are application data-access code, not a separately deployed API server or an authorization boundary.

## Local setup

### Requirements

- Git, Node.js, and npm compatible with the versions in [`package.json`](package.json) and [`package-lock.json`](package-lock.json).
- An isolated backend configuration if you want to exercise data operations.

The repository does not currently pin a Node.js version.

### Install

```bash
git clone https://github.com/Boat1x/RockSEC.git
cd RockSEC
npm ci
```

### Configure before starting

[`src/main.tsx`](src/main.tsx) currently contains deployment-specific Amplify configuration. Replace it with configuration for an environment you own before running the application against a backend. There is no environment-variable template or fully isolated offline mode in this snapshot.

Use synthetic data while exploring the prototype. The demo login and current API authorization are not suitable for sensitive client records.

### Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite. The login flow is defined in [`src/context/AuthContext.tsx`](src/context/AuthContext.tsx); it uses demonstration accounts and browser storage.

### Available checks

```bash
npm run lint
npm run build
```

`build` runs the TypeScript compiler followed by the Vite production build. After a successful build, `npm run preview` serves the generated frontend locally.

There is currently no automated test script or test suite committed in this repository. The commands above are project scripts, not a statement that this snapshot passes them.

## Current boundaries

- **Authentication:** login is simulated in the browser. The Amplify Auth resource exists, but the interface is not integrated with its identity flow.
- **Authorization:** role checks control navigation; they do not enforce backend permissions. The data schema currently uses API-key authorization.
- **Assessment output:** the questionnaire and score are illustrative. Report generation is simulated, and the form does not persist a completed assessment to the backend.
- **Dashboard data:** some views use static records, and the administrator dashboard can fall back to sample values after API failures.
- **Client workflow:** client components exist, but the routed client-detail page is a placeholder.
- **Deployment:** [`amplify.yml`](amplify.yml) defines an Amplify Gen 2 pipeline. It requires an appropriately configured AWS environment; this repository does not include a verified public deployment.

## Development priorities

1. Integrate real identity sessions and enforce authorization in the backend.
2. Move deployment configuration out of application source and remove configuration logging.
3. Persist assessments and connect report review to the data model.
4. Distinguish sample data from live data in the interface.
5. Add tests for access boundaries, scoring, and data-access failure cases.

## License and project history

The repository includes an **MIT No Attribution (MIT-0)** license inherited from the AWS starter. See [`LICENSE`](LICENSE) for the exact terms. The existing contribution and conduct files also contain AWS starter material.

Maintained by [Ryan Daich](https://github.com/Boat1x).
