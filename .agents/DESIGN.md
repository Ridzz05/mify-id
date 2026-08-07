# Systemify Design Constitution

> **Canonical direction:** `.agents/REDESIGN_V2.md` is the full design directive. This file is the short operational constitution that agents must use while working in the repository.

## Product identity

Systemify is a **Digital Systems Studio**. It builds the systems behind how businesses operate: software, internal tools, workflows, automation, and the operating support that keeps them useful.

The primary expression is:

```text
BUILD / AUTOMATE / OPERATE
```

The public experience explains the argument. The authenticated product helps an operator see, decide, act, and verify.

## Design priorities

Apply decisions in this order:

```text
INFORMATION → HIERARCHY → STRUCTURE → EVIDENCE → INTERACTION → DECORATION
```

Professional quality comes from clear writing, spacing, typography, reliable states, and useful evidence. Empty space is allowed. No visual effect is mandatory.

## Visual language

Operational Editorial should feel like engineering documentation, technical publishing, architecture diagrams, and calm operating software.

Avoid crypto/neon spectacle, generic SaaS sections, fake dashboards, decorative AI objects, arbitrary bento grids, excessive glass, gradients, glow, scroll reveals, and repeated identical feature cards.

### Tokens

All new UI should use tokens from `resources/css/app.css`:

```text
brand-paper / brand-paper-muted  neutral public surfaces
brand-dark / brand-ink           workspace and high-contrast surfaces
brand-blue                       authority, navigation, selected states
brand-lime                       active, actionable, operational signal
status-attention                 pending, review, waiting
status-blocked                   failed, critical, destructive
brand-line                      editorial and data separation
```

Neutral surfaces should dominate. Blue is selective. Lime is rare and semantic. Red, yellow, and green must communicate state and must be accompanied by text or an icon.

### Shape and type

- Editorial markers: 2–4px geometry.
- Inputs and compact controls: 6–10px geometry.
- Functional surfaces and dialogs: 12–16px geometry when containment improves usability.
- Pills: only for explicit status or control semantics.
- Monospace: identifiers, states, timestamps, deployment and technical metadata only.
- Headings carry identity; body text stays readable and concise.
- Do not put every sentence inside a card or place an eyebrow above every heading.

### Highlight rule

Highlight only a meaningful word or phrase. Prefer an offset marker or restrained background treatment without rounded badge behavior. The highlight must not overpower the statement or create accidental line-breaks at narrow widths.

## Public website rules

The homepage sequence is:

```text
POSITION → DISCIPLINES → SELECTED SYSTEMS → TRANSFORMATION → PROCESS → PRINCIPLES → START A SYSTEM
```

Lead with the operational problem and outcome, not technology names. Selected systems must show real evidence using:

```text
SYSTEM / PROBLEM / SOLUTION / RESULT / STACK
```

Use real screenshots, interface crops, diagrams, and approved project facts. Never manufacture product evidence or rely on stock imagery as if it were a client system.

## Authenticated product rules

The workspace is not a portfolio page. Its primary hierarchy is:

```text
SYSTEM STATUS → NEEDS ATTENTION → PROJECT PIPELINE → ACTIVE WORK → RECENT ACTIVITY → CLIENT INTAKE
```

Technical trivia belongs in a deliberate Diagnostics surface, not the main overview. Navigation should expose implemented product tasks, not a list of every page that happens to exist.

## Interaction and accessibility

- Motion is allowed only for state change, navigation, feedback, direct manipulation, hierarchy change, or progress.
- Prefer native controls and semantic HTML.
- Every interactive control needs a meaningful accessible name and visible focus state.
- Status meaning must not depend on color alone.
- Responsive states must be intentionally designed at 360, 390, 768, 1024, and 1440px.
- Mobile may convert tables and matrices into stacked records; it must not simply crop them.
- Respect `prefers-reduced-motion`.

## Copy rules

Copy is direct, specific, calm, and evidence-driven. Reject generic phrases such as:

```text
high-performance / seamless / cutting-edge / next-generation
transform your business / unlock your potential / the future of business
powerful digital experiences / take your brand to the next level
```

Prefer language about the actual workflow, constraint, system behavior, and measurable operating result.

## Component rules

Create semantic components only when a pattern repeats or owns behavior. Prefer names such as `ProjectStatus`, `SystemHealth`, `PipelineStage`, `ClientBrief`, `ActivityRow`, and `EvidenceRecord`.

Do not add decorative wrappers named `GlowCard`, `FancyCard`, `PremiumCard`, `CoolSection`, or `MagicButton`. Before adding an abstraction, identify its repeated information object, behavior, or state.

## Validation gate

Before handing off UI work:

1. Verify the public or product goal is obvious without decorative explanation.
2. Check the actual rendered state at 360, 390, 768, 1024, and 1440px when the surface is responsive.
3. Check empty, loading, error, focus, and success states for the changed flow.
4. Run `npm run build`, relevant backend tests, route checks, and `git diff --check`.
5. Update `.agents/roadmap.md` with the phase, files, preserved behavior, and evidence.

When this constitution and the full V2 directive disagree, follow `REDESIGN_V2.md` and update this file rather than inventing a third direction.
