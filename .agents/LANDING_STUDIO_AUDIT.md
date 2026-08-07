# Landing Studio / Editor Re-audit

Date: 2026-08-08

## Finding

The first implementation had a functional Hero inspector, but the section navigator exposed six non-Hero sections as read-only placeholders. Motion also persisted duration and delay values without exposing editors for them. Hero secondary-object position and responsive visibility were represented in two config branches without the inspector mirroring both branches.

Those gaps are now closed through the same allowlisted configuration path:

`Inspector state → normalize schema → LandingRenderer → draft/published configuration`

## Requirement matrix

| Area | Editor | Renderer effect | Persistence / safety | Status |
| --- | --- | --- | --- | --- |
| Hero | Content: eyebrow, headline, supporting copy, both CTA labels | Hero copy and CTA labels update in the shared renderer | PHP allowlist + bounded strings | Implemented |
| Hero | Layout: alignment, vertical alignment, width, height | Hero classes and vertical grid alignment update | PHP enum allowlist | Implemented |
| Hero | Secondary object: position and desktop/tablet/mobile visibility | Operating-model panel moves and responds at each breakpoint | Layout and `secondaryObject` branches are mirrored during normalization and editing | Implemented |
| Hero | Highlight: phrase, style, width, shape | Selected phrase receives the configured semantic treatment | Style/width/shape enums only | Implemented |
| Global cards | Sharp, soft, half-rounded, full-rounded | Production card surface changes | Shape token map; no class strings persisted | Implemented |
| Disciplines | Eyebrow, title, intro, visibility | Capabilities section copy and presence update immediately | Section keys and localized strings are allowlisted | Implemented |
| Selected systems | Eyebrow, title, intro, visibility | Evidence section copy and presence update; portfolio evidence remains data-owned | Studio cannot inject HTML, CSS, or portfolio records | Implemented |
| Transformation | Eyebrow, title, visibility | Transformation section copy and presence update | Section keys and localized strings are allowlisted | Implemented |
| Process | Eyebrow, title, visibility | Process section copy and presence update | Process rows remain renderer-owned | Implemented |
| Principles | Eyebrow, title, visibility | Principles section copy and presence update | Principles list remains renderer-owned | Implemented |
| Project intake | Eyebrow, title, intro, visibility | Intake section copy and presence update; form contract remains unchanged | Intake inputs are not configurable as arbitrary markup | Implemented |
| Motion | Preset, intensity, scroll behavior, duration, delay, replay | GSAP preset behavior updates in preview/public renderer | Semantic motion enums; reduced motion exits before animation | Implemented |
| Preview | 1440, 1024, 768, 390, 360 | Same `LandingRenderer` at the selected viewport width | Local state only until save | Implemented |
| Workflow | Save draft, publish, revision restore | Public page reads only `published_config` | Publish is disabled until local edits are saved; restore creates a new draft | Implemented |

## Verification

- `npm run build` passes.
- `php artisan test` passes: 31 tests / 108 assertions.
- Site Studio routes remain protected by authentication.
- Regression coverage verifies section content/visibility normalization, invalid-key removal, mirrored secondary-object state, draft privacy, publish revisions, and restore behavior.
- `git diff --check` passes.

Visual browser screenshots were not captured in this pass because no user-selected browser or browser automation tool is available in the current context. The implementation audit therefore covers code, data flow, and runtime/build evidence; a visual pass should still inspect the editor at desktop and mobile widths.
