# SYSTEMIFY / LANDING STUDIO
## Controlled Visual Configuration System

> Status: V2 full-page editability implemented and regression-tested.
> Scope: Admin Site Studio + Public Landing Renderer
> Principle: Customizable without sacrificing brand integrity.

Re-audit notes: [.agents/LANDING_STUDIO_AUDIT.md](LANDING_STUDIO_AUDIT.md)
Full editability directive: [.agents/LANDING_STUDIO_FULL_EDITABILITY.md](LANDING_STUDIO_FULL_EDITABILITY.md)

---

# 01 / GOAL

Build an authenticated visual configuration environment that allows
authorized Systemify administrators to modify selected presentation
properties of the public website without editing source code.

The system must support:

- real-time preview
- content editing
- layout configuration
- shape presets
- hero alignment
- highlight configuration
- controlled GSAP motion presets
- responsive preview
- draft / publish workflow
- revision history

This is NOT a free-form page builder.

It is a controlled design system interface.

---

# 02 / CORE PRINCIPLE

The administrator modifies semantic design decisions.

The administrator does NOT modify:

- Tailwind class strings
- arbitrary CSS
- raw HTML
- JavaScript
- arbitrary GSAP code

Configuration must always map to predefined Systemify design tokens.

---

# 03 / ADMIN ROUTE

Create a dedicated workspace:

`/admin/site-studio`

Suggested navigation:

SITE
- Landing Studio
- Content
- Revisions

Do not bury the entire feature under a generic Settings form.

---

# 04 / STUDIO LAYOUT

Desktop layout:

LEFT
Section Navigator

CENTER
Live Preview

RIGHT
Inspector

TOP
Viewport controls + Draft state + Publish controls

Example:

[ Landing ]     DRAFT SAVED      [1440][768][390]     Publish

Sections        Live Preview                         Inspector

Hero                                                 Content
Disciplines                                           Layout
Systems                                               Shape
Transformation                                        Motion
Process
Principles
Project Intake

---

# 05 / HERO CONTROLS

CONTENT

- eyebrow
- headline
- supporting copy
- primary CTA label
- secondary CTA label

LAYOUT

- left / center / right alignment
- vertical alignment
- content width
- hero height
- secondary object position
- desktop/tablet/mobile visibility

HIGHLIGHT

- selected phrase
- none
- marker
- underline
- offset block
- signal line
- width preset
- shape preset

---

# 06 / SHAPE SYSTEM

Provide visual presets:

SHARP
SOFT
HALF-ROUNDED
FULL-ROUNDED

The UI should show actual miniature shape previews instead of only text.

Advanced mode may expose individual corner controls:

top-left
top-right
bottom-left
bottom-right

Never store generated CSS classes.

Store semantic values.

Example:

{
  "shape": "half-rounded"
}

---

# 07 / LIVE PREVIEW

Preview must use the exact same landing components used by production.

Never maintain a separate approximation of the public website.

Configuration flow:

Inspector State
→ Landing Renderer
→ Immediate Preview

Saving is not required for local preview.

Provide viewport presets:

1440
1024
768
390
360

Provide:

Replay Motion

---

# 08 / CONFIGURATION MODEL

Recommended persisted model:

SiteConfiguration

- id
- name
- draft_config
- published_config
- revision
- published_at
- published_by
- created_at
- updated_at

Public pages consume only:

published_config

Admin Studio consumes:

draft_config

---

# 09 / PUBLISHING FLOW

EDIT
↓
PREVIEW
↓
SAVE DRAFT
↓
REVIEW
↓
PUBLISH

Never expose unsaved or draft changes publicly.

---

# 10 / REVISION HISTORY

Each publish operation should create a recoverable revision.

The administrator must be able to:

- inspect revision number
- inspect publication time
- inspect publisher
- restore a previous revision

Restoring a revision must first create a new draft.

Do not silently overwrite publication history.

---

# 11 / CONFIGURATION EXAMPLE

{
  "hero": {
    "content": {
      "eyebrow": "DIGITAL SYSTEMS STUDIO",
      "headline": "We build the systems behind how businesses operate.",
      "description": "Custom software, internal tools and automation built around real workflows.",
      "primaryCta": "Start a Project",
      "secondaryCta": "View Selected Systems"
    },

    "layout": {
      "alignment": "left",
      "verticalAlignment": "center",
      "contentWidth": "wide",
      "height": "full"
    },

    "highlight": {
      "text": "how businesses operate",
      "style": "marker",
      "width": "compact",
      "shape": "soft"
    },

    "secondaryObject": {
      "type": "system-status",
      "position": "top",
      "desktop": true,
      "tablet": true,
      "mobile": false
    },

    "motion": {
      "preset": "editorial-reveal",
      "intensity": "subtle",
      "scrollBehavior": "once"
    }
  },

  "cards": {
    "shape": "half-rounded"
  }
}

---

# 12 / GSAP

GSAP becomes the preferred motion system for newly redesigned
public-facing Systemify sections.

Install project dependencies:

npm install gsap @gsap/react

Codex must use the official GreenSock GSAP skills.

Install the skills separately into Codex:

npx skills add https://github.com/greensock/gsap-skills

After installation, restart Codex before beginning GSAP implementation.

Relevant skills:

- gsap-core
- gsap-timeline
- gsap-scrolltrigger
- gsap-react
- gsap-performance
- gsap-plugins

---

# 13 / MOTION PRESETS

The Studio exposes semantic presets.

NONE

EDITORIAL_REVEAL
Mask-based content entrance.

SIGNAL_WIPE
Short Systemify signal/highlight animation.

SYSTEM_STAGGER
Sequential metadata reveal.

EVIDENCE_REVEAL
Reveal real project evidence using controlled clipping/mask.

PROCESS_PROGRESS
Scroll-linked progress through the Systemify process.

Do not expose arbitrary animation source code.

---

# 14 / MOTION INSPECTOR

Controls may include:

Preset
Intensity
Entrance behavior
Scroll behavior
Duration preset
Delay preset

Recommended options:

Intensity:
SUBTLE
STANDARD
EXPRESSIVE

Scroll:
NONE
ONCE
SCRUB

Avoid raw duration/easing configuration in the default interface.

An Advanced panel may expose additional whitelisted values later.

---

# 15 / GSAP ENGINEERING RULES

In React:

- prefer `useGSAP`
- scope selectors
- clean animation contexts
- use GSAP timelines for sequencing
- prefer transforms and opacity
- use ScrollTrigger only when scroll carries meaning
- refresh ScrollTrigger after meaningful dynamic layout changes
- support prefers-reduced-motion

Never allow GSAP and Framer Motion to simultaneously own the same
transform or opacity properties on the same DOM element.

---

# 16 / ACCESSIBILITY

The public experience must remain completely understandable with
animations disabled.

Motion may enhance hierarchy.

Motion must never contain essential information.

Respect:

prefers-reduced-motion

Status must never depend solely on color.

---

# 17 / SAFETY

Never allow:

- arbitrary CSS
- arbitrary Tailwind classes
- arbitrary HTML
- JavaScript input
- arbitrary GSAP scripts

All configuration must be validated on the server.

Use allowlisted enum values.

Invalid configuration must fall back to design-system defaults.

---

# 18 / ARCHITECTURE

Recommended frontend architecture:

SiteStudio/
  Index.jsx

SiteStudio/
  SectionNavigator.jsx
  StudioToolbar.jsx
  PreviewViewport.jsx
  Inspector.jsx

SiteStudio/inspectors/
  ContentInspector.jsx
  LayoutInspector.jsx
  ShapeInspector.jsx
  MotionInspector.jsx

Landing/
  LandingRenderer.jsx

Landing/sections/
  HeroSection.jsx
  DisciplinesSection.jsx
  SelectedSystemsSection.jsx
  TransformationSection.jsx
  ProcessSection.jsx
  PrinciplesSection.jsx
  ProjectIntakeSection.jsx

Landing/config/
  defaults.js
  schema.js
  shapeTokens.js
  motionPresets.js

The public website AND Site Studio preview must use LandingRenderer.

---

# 19 / BACKEND

Recommended responsibilities:

SiteStudioController
- edit
- saveDraft
- publish
- restoreRevision

Models:

SiteConfiguration
SiteConfigurationRevision

Validation must whitelist all enum-style design values.

Use transactional publication when creating revisions.

---

# 20 / EXECUTION PHASES

PHASE A
Configuration schema + defaults.

PHASE B
LandingRenderer refactor.

PHASE C
Database draft/publish/revision architecture.

PHASE D
Site Studio shell.

PHASE E
Hero Inspector.

PHASE F
Shape controls.

PHASE G
GSAP motion engine.

PHASE H
Responsive preview.

PHASE I
Revision restore.

PHASE J
Accessibility, validation and production testing.

Do not implement all phases simultaneously.

---

# 21 / DEFINITION OF DONE

Landing Studio is complete when:

- hero content can be changed from admin
- hero alignment can be changed
- visual shape presets can be changed
- highlights can be configured
- GSAP motion presets can be selected
- changes appear instantly in preview
- desktop/tablet/mobile can be previewed
- draft changes remain private
- publishing updates the public website
- previous revisions can be restored
- invalid configuration cannot break the site
- public pages remain usable with motion disabled

---

# FINAL PRINCIPLE

The Site Studio exists to provide:

CONTROL WITHOUT CHAOS.

Customization must strengthen Systemify's identity,
not allow administrators to accidentally destroy it.
