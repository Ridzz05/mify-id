# Systemify / Phase 0 UI Audit

**Date:** 08 August 2026  
**Directive:** `.agents/REDESIGN_V2.md`  
**Scope:** Public website, authentication shell, authenticated workspace, shared visual primitives, copy, responsive behavior, and the seams that provide UI data.  
**Audit mode:** Combined UX, visual, accessibility, and implementation audit.  
**Phase decision:** Audit complete. No major redesign changes are authorized by this phase.

## Audit objective

Determine what the current implementation already satisfies from REDESIGN V2, what needs a controlled refinement, what is obsolete, and what requires a deliberate rebuild. The audit preserves working Laravel/Inertia routes and backend behavior as the default constraint.

## Evidence captured

The current implementation was served locally and captured in a fresh Chromium run. Accepted screenshots are stored temporarily under `/tmp` so the repository is not polluted with QA artifacts:

- Public homepage: `systemify-v2-public-360.png`, `390.png`, `768.png`, `1024.png`, `1440.png`.
- Authentication shell: `systemify-v2-login-360.png`, `systemify-v2-login-1440.png`.
- Authenticated dashboard: `systemify-v2-dashboard-360.png`, `1024.png`, `1440.png`.
- Authenticated workspace spot checks at 360px: `systemify-v2-briefs-360.png`, `pipelines-360.png`, `portfolios-360.png`, `live-preview-360.png`.

The first 390px public capture was blank and was rejected; the listed 390px capture is the replacement that was inspected and accepted. Authentication was established through a local session cookie set inside Chromium; no credential-bearing page or repository artifact was created.

## Executive verdict

The V1 implementation is a credible foundation for the V2 direction. The public homepage now communicates the category and primary statement quickly, uses the required `BUILD / AUTOMATE / OPERATE` model, and avoids the former neon/glass marketing treatment. The authenticated workspace is materially denser and more operational than the previous dashboard.

The V2 end state is not yet proven because the evidence system is only a title/description/stack record, the live database currently renders zero selected systems, the project intake captures only three fields, the authenticated navigation is still a flat five-item list, and legacy design/copy primitives remain in the repository. These are structural gaps, not polish tasks.

## KEEP

### Product and architecture

- Keep the Laravel/Inertia monolith, existing route names, auth boundary, brief intake route, pipeline CRUD, portfolio CRUD, and live preview route. The current route seams are stable and are the safest integration boundary for the next phases.
- Keep the current public-to-workspace split. `AppLayout` is narrative and spacious; `AdminLayout` is dark, dense, and task-oriented.
- Keep the current local bilingual approach in `Welcome.jsx` until the copy source is consolidated. It makes the primary public narrative available in both English and Indonesian without changing the backend contract.

### Public experience

- Keep the public sequence in `Welcome.jsx`: position, disciplines, selected systems, transformation, process, principles, and project intake (`resources/js/Pages/Welcome.jsx:178-376`). It is an argument rather than a generic feature/testimonial/CTA stack.
- Keep the first-screen positioning: “We build the systems behind how businesses operate.” It passes the five-second category test in the accepted 360px, 390px, 768px, 1024px, and 1440px captures.
- Keep the single dark operating-model object beside the desktop hero (`resources/js/Pages/Welcome.jsx:206-225`). It provides system information and status instead of decorative product art.
- Keep the transformation rows, technical process sequence, direct principles, and “Start with the workflow” intake framing. These are the strongest V2-aligned narrative structures.
- Keep the flat editorial rules, off-white paper surface, authoritative blue, rare signal lime, semantic traffic-signal colors, and contextual rectangular geometry in `resources/css/app.css`.

### Workspace and interaction

- Keep the responsive workspace drawer, explicit current location, operational state, operator identity, and compact navigation in `resources/js/Layouts/AdminLayout.jsx`.
- Keep the dashboard hierarchy around active projects, needs attention, system health, recent activity, and quick actions (`resources/js/Pages/Dashboard.jsx:64-128`). It is aligned with V2’s “SEE / DECIDE / ACT / VERIFY” intent.
- Keep the mobile project list in `Dashboard.jsx:87-89`. The accepted 360px dashboard capture shows project, client, phase, health, due date, and open action without forcing the user into the desktop table.
- Keep native form controls, visible `:focus-visible` styles, semantic button labels, `aria-current`, `aria-expanded`, dialog semantics, and `prefers-reduced-motion` support. These are good foundations, although they still need keyboard and screen-reader verification.

## REFINE

### Public hierarchy and evidence

1. **Hero highlight behavior.** The lime phrase is editorial rather than pill-shaped, which is correct, but the inline highlight wraps differently at 360px, 390px, 1024px, and 1440px. At 1024px, “how” separates from the highlighted “businesses operate.” Refine the marker treatment or controlled line breaks so the primary statement stays intentional without turning the phrase into a UI chip (`resources/js/Pages/Welcome.jsx:182-184`).
2. **Selected-system content.** The public renderer currently shows `category`, `title`, one `description`, `system`, and `stack` (`resources/js/Pages/Welcome.jsx:264-284`). V2 explicitly requires `PROBLEM / SYSTEM / RESULT / STACK`; keep the layout but refine the data contract and renderer once the evidence model is rebuilt.
3. **Real evidence.** The current portfolio fallback and seeder use Unsplash stock images and marketing-style descriptions (`app/Models/Portfolio.php:35-49`, `database/seeders/PortfolioSeeder.php`). Replace those with approved project screenshots, interface crops, workflow diagrams, or an explicit empty state. Do not manufacture fake software evidence.
4. **Project intake.** The visible intake has `name`, `email`, and `message` only (`resources/js/Pages/Welcome.jsx:162`, `367-371`). V2’s intended brief asks what currently happens, what is slowing the operation, what should improve, budget, and timeline. Refine the form and backend contract together, preserving legacy fields or introducing a versioned mapping rather than silently changing `briefs.store`.
5. **Empty evidence state.** The accepted authenticated dashboard shows `0` published systems, and the public system section therefore renders its empty state. The UI copy is honest, but the V2 success criterion “real systems are more visible than marketing claims” cannot be met until approved evidence records are available and seeded intentionally.

### Workspace information architecture

6. **Navigation structure.** `AdminLayout` currently exposes Overview, Project pipeline, Client intake, Selected systems, and Live site under one `Operate` label (`resources/js/Layouts/AdminLayout.jsx:29-64`). V2 proposes distinct Operations, Systems, Commerce, and Administration groups. Refine the IA from actual product capabilities first; do not add dead links for Automations, Integrations, Deployments, POS, Activity, Diagnostics, or Settings until their routes and tasks exist.
7. **Diagnostics boundary.** `routes/web.php` still probes the Vite server, Open Design daemon, database size, admin count, and git commit on every dashboard request, while the dashboard only uses a subset. Keep diagnostics available, but move that information behind a deliberate System / Diagnostics surface instead of allowing runtime trivia to shape the main workspace payload.
8. **Mid-width pipeline table.** At 1024px, the authenticated dashboard capture shows the right edge of the desktop pipeline table beginning to clip inside the content area. The table is intentionally horizontally scrollable (`resources/js/Pages/Dashboard.jsx:81-85`), but the `min-w-[44rem]` desktop branch should switch to the compact project rows before this width or provide an unmistakable scroll affordance.
9. **Portfolio filter overflow.** The 360px portfolio capture shows the category filter row continuing beyond the viewport. This is intentional overflow, but it has no visible affordance. Refine the filter strip with keyboard-friendly scrolling, a clearer overflow cue, or a compact select at the smallest widths.
10. **Authentication composition.** The login shell is calm and legible at 360px and 1440px, but the mobile state leaves a large amount of unstructured vertical space around the form. Keep the restraint; refine the vertical rhythm and place the access task at a more predictable reading position without adding decorative content (`resources/js/Layouts/GuestLayout.jsx:12-35`).

### Accessibility and system consistency

11. **Status semantics.** Status dots are paired with text in the audited public operating model and workspace health rows, which is good. Continue this rule for every future status, including table rows, modals, and empty states; color alone must never carry meaning.
12. **Focus and keyboard proof.** Source-level focus styles exist, but no keyboard-only traversal or assistive-technology run was completed in this Phase 0 capture. Add keyboard checks to Phase 7 validation, especially for the mobile drawer, filter strips, dialogs, and the live preview viewport controls.
13. **Design-source conflict.** `.agents/DESIGN.md` still contains the older dark-neon, rounded-card, glow, and pill guidance while `REDESIGN_V2.md` declares Operational Editorial as the active direction. Reconcile the constitution before Phase 1 so agents do not receive contradictory rules. `REDESIGN_V2.md` should be the direction for this redesign, but the repository needs one unambiguous source of truth.

## REMOVE

- Remove or migrate the unused legacy marketing copy in `resources/js/locales/en.json` and `id.json`, including “premium,” marketing-agency, physics-animation, and neon-gradient language. The active `Welcome.jsx` copy is local and no longer consumes those old keys, so leaving them creates a future regression path.
- Remove the compatibility-era `glowColor` and `animate` props from `resources/js/Components/Brand/BrandCard.jsx` once all references are confirmed absent. Their presence signals a visual system that V2 explicitly rejects.
- Remove the `animate-spin` loading treatment from `BrandButton.jsx` or replace it with a semantic, restrained pending state. The active V2 system has no reason to retain a decorative animation primitive.
- Remove the active need for `brand-glow`, `brand-panel`, and cursor compatibility names after the reference audit is complete. `AppLayout`’s `CustomCursor` export currently returns `null`; it should not remain a conceptual dependency indefinitely.
- Remove `Framer Motion` from active UI code and reassess the dependency after the repository-wide reference audit. The current active pages do not need it, but the package should not be removed blindly while stale components or generated blueprint copy still mention it.
- Remove “High-Performance Focus” and similar banned copy from generated blueprint fallback text (`app/Http/Controllers/BriefController.php:332-336`) in a later copy/backend cleanup pass. This is not a visual-only change, so it remains out of Phase 0 implementation.

## REBUILD

### 1. Evidence system

Rebuild the portfolio/evidence contract around a meaningful system record:

```text
SYSTEM ID
TITLE
PROBLEM
SYSTEM / SOLUTION
RESULT
STACK
SCREENSHOTS OR DIAGRAMS
CATEGORY
PUBLIC STATUS
```

Preserve current CRUD routes where possible, add fields through a deliberate migration, and make the admin editor collect evidence rather than only a marketing description. The public page should render the same facts in a case-study-like structure.

### 2. Start-a-system brief

Rebuild the intake as an operational brief, not a contact form. Define the canonical fields, validation, persistence, admin display, and success state together. Preserve compatibility with current `name`, `email`, and `message` submissions if existing integrations depend on them.

### 3. Workspace IA and diagnostics

Rebuild the navigation information architecture around real tasks and existing routes. Add new sections only when they have an actual user goal, data source, route, empty state, and validation plan. Move environment probes and implementation diagnostics out of the primary overview.

### 4. Shared semantic primitives

Rebuild the remaining shared primitives around semantic names such as `ProjectStatus`, `SystemHealth`, `PipelineStage`, `ClientBrief`, and `ActivityRow`. Do not create more generic visual wrappers. The current compatibility components can be migrated incrementally after usage inventory.

## Requirement matrix

| V2 requirement | Current evidence | Decision |
|---|---|---|
| Category and primary statement understood immediately | Accepted public captures at 360–1440px; hero leads with the required statement | KEEP |
| BUILD / AUTOMATE / OPERATE identity | Hero operating model, capability section, footer, and auth footer | KEEP |
| Public sequence: position → disciplines → systems → transformation → process → principles → intake | `Welcome.jsx:178-376` | KEEP / REFINE |
| Evidence contains problem, system, result, stack | Current model/renderer only has description, system, and stack | REBUILD |
| Real evidence over decoration | Runtime currently has zero selected systems; seed data uses stock images | REBUILD |
| Admin feels dense, calm, precise, and operational | Accepted dashboard/workspace captures at 360, 1024, and 1440px | KEEP / REFINE |
| Technical trivia belongs in diagnostics | Runtime probes still originate in the dashboard route | REFINE / REBUILD |
| Mobile is intentionally redesigned | Mobile dashboard list and workspace captures pass basic reflow; filter/table affordances remain | REFINE |
| Accessibility requirements | Source has labels, focus-visible, semantic status text, and reduced-motion rule; keyboard/AT not yet run | REFINE / VERIFY |
| No generic AI copy or stale neon primitives | Active homepage is restrained, but legacy locales, components, seed data, and blueprint fallback retain violations | REMOVE |

## Recommended phase order

1. Reconcile `.agents/DESIGN.md` with V2 and freeze the foundation vocabulary.
2. Build the evidence data contract and replace empty/stock portfolio state with approved real evidence.
3. Define and implement the operational brief fields while preserving current submissions.
4. Refine dashboard mid-width behavior, portfolio filter affordance, and auth vertical rhythm.
5. Reorganize workspace navigation only around implemented tasks; add Diagnostics as a real destination if retained.
6. Remove stale copy and compatibility primitives after a complete reference audit.
7. Run keyboard, reduced-motion, contrast, error-state, and responsive QA at 360, 390, 768, 1024, and 1440px.

## Phase 0 exit criteria

- [x] `.agents/UI_AUDIT.md` exists with KEEP / REFINE / REMOVE / REBUILD decisions.
- [x] Current public and authenticated surfaces were captured and inspected at the required representative widths.
- [x] Working backend routes and data seams were identified and marked for preservation.
- [x] Structural gaps are separated from polish issues.
- [ ] No Phase 1 implementation has started in this audit pass.

