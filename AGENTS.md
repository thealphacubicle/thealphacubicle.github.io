# Agent Team Workflow

This repository uses a Claude Code agent team for feature work. The team follows the existing Next.js, TypeScript, ShadCN/ui, and Tailwind conventions.

## Workflow

1. `tech-lead` receives the request, breaks it into tickets, and adds those tickets to the shared task list.
2. For a new route or data pattern, `systems-architect` reviews the architectural approach first.
3. `ux-engineer` defines and reviews the user flow, information architecture, hierarchy, and required states.
4. `ui-engineer` builds the functional interface with accessible ShadCN/ui and Tailwind components.
5. `visual-design-specialist` polishes the visual language and theme after functional components are in place.
6. `tech-lead` performs the final review and approves the pull request.

Roles may collaborate or be skipped when a ticket does not require their scope, but the handoff order is the default for new pages.

## Shared Task List

Keep a simple Markdown checklist in the working task or team notes. Each ticket should include its owner, branch, status, and validation notes:

```md
- [ ] T-001: Add profile section
  - Owner: ui-engineer
  - Branch: ticket/profile-section
  - Status: in progress
  - Dependencies: T-000 architecture review
  - Validation: pending
```

Mark work complete only after the assigned reviewer records the relevant checks. Flag proposed dependency additions in the task list before installing them.

## Definition Of Done

A ticket is done when:

- The project builds with no TypeScript errors.
- Lint passes.
- The experience is responsive at mobile, tablet, and desktop sizes.
- The implementation matches existing design tokens and component conventions.
- Required accessibility, loading, empty, error, and interaction states are handled.
- The appropriate specialist reviews the work and `tech-lead` completes final review.

## Branches And Pull Requests

Use one branch per ticket. Open a pull request against `main` only after `tech-lead` approves the completed work.
