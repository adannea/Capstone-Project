# Project: Capstone Project

## Stack
- React 18 + TypeScript, bundled with Vite
- Package manager: npm
- Styling: (fill in — CSS Modules / Tailwind / styled-components)
- Testing: (fill in — Vitest / Jest, once set up)

## Conventions
- Components: PascalCase, one component per file (`Button.tsx`)
- Functions/variables: camelCase
- Commit messages: Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`)
- Branching: feature branches off `main`, e.g. `feat/navbar`
- No `console.log` left in committed code
- Run `npm run lint` before committing (once configured)

## Notes for Claude Code
- Keep components small and focused
- Prefer functional components with hooks
- Explain non-obvious logic with brief comments

## Lessons Learned (Vague vs. Precise Prompting Exercise)

1. Always specify validation rules explicitly — format, length, and
   required/optional status for every field. A vague prompt produces a form
   that accepts anything, including empty or malformed input.

2. Every form input needs a real `<label>` connected via `htmlFor`/`id`, not
   just a placeholder. Placeholders disappear on typing and aren't reliably
   announced by screen readers — they are not an accessible substitute for
   labels.

3. Error messages must be programmatically tied to their input (e.g.
   `aria-describedby`, `role="alert"`) and overall form status announced via
   `aria-live`, not just shown visually. Visual-only errors are invisible to
   screen-reader users.

4. Always request that tests be written AND run before considering a feature
   done — a prompt without an explicit verification step produces code that
   looks correct but is unverified.