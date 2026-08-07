# Landing Studio / Full Editability Audit

Date: 2026-08-08
Status: V2 implemented; code/runtime audit complete. Browser screenshots were not available in this context.

## CURRENT GAPS — before V2

The previous Landing Studio was PARTIAL. It exposed Hero copy/layout/shape/motion and scalar headings for other sections, while the meaningful repeated content, global shell copy, hero operating panels, systems presentation, intake field copy, CTA targets, and domain selection remained renderer-owned or hardcoded. Process and principles were explicitly renderer-owned. The requested `.agents/LANDING_STUDIO_FULL_EDITABILITY.md` file was also absent; the existing local directive was `.agents/LANDING_STUDIO_EDITABILITY.md`.

## CONFIG V2 PLAN — implemented

The normalized contract is now `version: 2` with bounded, allowlisted values:

- `global`: brand/meta, navigation, footer, contact.
- `hero`: localized copy and approved CTA targets, layout, highlight, responsive secondary-object state, editable meta items, operating-model/workflow/active-project panel copy and rows, semantic motion.
- `cards`: shape token.
- `sections.disciplines`: localized heading plus editable groups and nested items.
- `sections.systems`: localized heading plus domain-data selection mode, selected IDs, limit, layout, field visibility, labels, missing/empty states.
- `sections.transformation`, `process`, `principles`: localized ordered repeaters.
- `sections.intake`: localized heading, presentation copy, fixed backend field keys with editable labels/placeholders/required flags, and success copy.

The editor uses Content / Structure / Layout / Appearance / Motion inspectors, with accessible add, delete, move-up, and move-down controls for repeaters. The public page and preview both use `LandingRenderer`; the editor never stores raw HTML, CSS, JavaScript, or GSAP code.

## BACKWARD-COMPATIBILITY PLAN — implemented

- Missing, V1, and old revisions normalize into V2 without a database migration.
- Existing Hero position/visibility aliases are mirrored into the V2 canonical layout branch.
- Unknown keys are dropped, strings are bounded and sanitized, enum/boolean values are allowlisted, IDs are stabilized and deduplicated, and arrays have bounded lengths.
- Explicit empty arrays remain empty so editors can intentionally remove content and public empty states render safely.
- Portfolio evidence remains domain-owned. Studio controls selection/presentation only; the renderer receives domain records and never duplicates their business data.
- Draft remains private until publish. Publish normalizes the draft and stores a complete revision; restore replaces draft only.

## FILES TO CHANGE / CHANGED

- `app/Support/LandingConfiguration.php`: V2 defaults and PHP normalizer.
- `resources/js/Pages/Landing/config/defaults.js`: synchronized V2 defaults.
- `resources/js/Pages/Landing/config/schema.js`: synchronized JS normalizer and V1 migration.
- `resources/js/Pages/Welcome.jsx`, `resources/js/Layouts/AppLayout.jsx`: config/domain-owned shared renderer and shell.
- `resources/js/Pages/SiteStudio/Index.jsx`, `resources/js/Pages/SiteStudio/Repeater.jsx`: contextual inspectors and safe repeaters.
- `routes/web.php`, `app/Http/Controllers/SiteStudioController.php`: publish config before domain selection and provide domain records to Studio/public renderer.
- `tests/Feature/SiteStudioTest.php`: V1, V2, sanitization, selection, revision, and restore coverage.
- `.agents/LANDING_STUDIO.md`, `.agents/LANDING_STUDIO_FULL_EDITABILITY.md`, `.agents/roadmap.md`: status, compatibility pointer, and checkpoint.

## OWNERSHIP MATRIX

| Visible value | Owner | Editor / renderer contract |
| --- | --- | --- |
| Hero, section, panel, nav/footer/contact, intake copy | Site Studio config | V2 localized fields |
| Ordered discipline, transformation, process, principle, panel rows | Site Studio config | Bounded repeaters with stable IDs |
| Portfolio title, description, problem, solution, result, stack, image, URL | Portfolio domain | Studio selects and presents records only |
| Form submission field names and route contract | Immutable system UI/domain contract | Labels, placeholders, and required flags are configurable |
| Semantic classes, responsive breakpoints, GSAP implementation, current year | Immutable system UI | No raw implementation values in config |

## TEST PLAN / RESULTS

- `php artisan test --filter=SiteStudioTest`: passed, 7 tests / 65 assertions.
- `npm run build`: passed with Vite production build.
- `php -l` for changed PHP route/controller/config files: passed.
- `git diff --check`: passed.
- Hard-coded audit: no `content`/`capabilityGroups` business-copy source remains in the shared public renderer; no public shell email/nav/footer copy remains outside normalized config.
- Runtime contract: public root normalizes published config, Studio normalizes draft/revision config, and both render through `LandingRenderer`.
- Manual browser screenshot audit: blocked by the absence of a browser/browser-automation tool in this context; responsive preview controls remain implemented for 1440/1024/768/390/360.

## IMPLEMENTATION ORDER

1. Audit and ownership map.
2. V2 defaults and synchronized JS/PHP normalization.
3. Shared renderer and domain-backed systems selection.
4. Contextual Studio inspectors and repeaters.
5. Draft/publish/revision compatibility tests.
6. Build, runtime, hard-coded audit, and documentation checkpoint.
