# Animated Theme Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every segmented theme selector with one Magic UI animated light/dark button that initially follows the operating-system theme and remove all command-palette theme actions.

**Architecture:** Keep `next-themes` authoritative for system-theme resolution and persistence. `ThemeToggle` adapts `resolvedTheme` and `setTheme` to the controlled `theme` and `onThemeChange` interface already exposed by `AnimatedThemeToggler`; the animated component owns the View Transition and immediate fallback.

**Tech Stack:** Next.js 16, React 19, TypeScript, `next-themes`, Magic UI registry component, Tailwind CSS v4

## Global Constraints

- The initial effective theme follows the operating-system preference through `defaultTheme="system"` and `enableSystem`.
- After activation, persist an explicit `light` or `dark` selection through `next-themes`.
- Render one theme button in every existing responsive placement.
- The animated toggle is the only theme control; remove theme actions from the command palette.
- Use the circular reveal from the clicked button with the component's 400 ms default duration.
- Skip the reveal for `prefers-reduced-motion: reduce` and for browsers without View Transitions support.
- Do not add a test framework or dependency; the repository explicitly requires asking before doing so.
- Preserve and publish all pre-existing uncommitted changes, as explicitly requested by the user.

---

### Task 1: Integrate the controlled animated toggle

**Files:**
- Modify: `src/components/theme-toggle.tsx`
- Modify: `src/components/ui/animated-theme-toggler.tsx`

**Interfaces:**
- Consumes: `useTheme(): { resolvedTheme?: string; setTheme(theme: string): void }`, `useIsHydrated(): boolean`, and `buttonVariants({ variant: "ghost", size: "icon-sm" }): string`
- Produces: `ThemeToggle({ className?: string }): React.JSX.Element` backed by `AnimatedThemeTogglerProps.theme` and `AnimatedThemeTogglerProps.onThemeChange`

- [x] **Step 1: Verify the pre-change behavior is missing**

Inspect `src/components/theme-toggle.tsx` and confirm it renders `ToggleGroup` with three entries (`light`, `system`, `dark`) rather than `AnimatedThemeToggler`. This is the observable pre-change failure; no automated component-test harness exists in the repository, and none will be introduced without authorization.

- [x] **Step 2: Implement the minimal controlled wrapper**

Replace the segmented control with the documented Magic UI integration, retaining the hydration guard and project styling:

```tsx
const { resolvedTheme, setTheme } = useTheme();
const hydrated = useIsHydrated();
const theme = resolvedTheme === "dark" ? "dark" : "light";
const nextTheme = theme === "dark" ? "light" : "dark";

return (
  <AnimatedThemeToggler
    theme={theme}
    onThemeChange={setTheme}
    disabled={!hydrated}
    aria-label={`Switch to ${nextTheme} theme`}
    title={`Switch to ${nextTheme} theme`}
    className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), className)}
  />
);
```

- [x] **Step 3: Add the reduced-motion fallback**

In `AnimatedThemeToggler.toggleTheme`, apply the theme without calling `document.startViewTransition` when the browser lacks the API or the user requests reduced motion:

```tsx
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches

if (
  typeof document.startViewTransition !== "function" ||
  prefersReducedMotion
) {
  applyTheme()
  return
}
```

- [x] **Step 4: Run focused static verification**

Run: `pnpm typecheck`

Expected: exit 0 with no TypeScript errors, proving the wrapper's controlled props and `setTheme` callback are compatible.

### Task 2: Remove alternate theme controls and finish transition styles

**Files:**
- Modify: `src/components/command-palette.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: the existing command palette section/page/contact commands
- Produces: a command palette with no theme actions and globally scoped root View Transition rules

- [x] **Step 1: Verify the pre-change behavior is present**

Inspect `src/components/command-palette.tsx` and confirm the palette exposes a `Theme` command group and theme-related description/input copy. Inspect `src/app/globals.css` and confirm the newly added View Transition rule is malformed relative to the surrounding formatting and lacks the component's active-transition duration and initial-clip selectors.

- [x] **Step 2: Remove the command-palette theme surface**

Delete the `useTheme` import and hook, the `MonitorIcon`, `MoonIcon`, and `SunIcon` imports, the final separator and Theme command group, and references to theme switching in the dialog description and input placeholder.

- [x] **Step 3: Scope and complete the View Transition CSS**

Format the root pseudo-element rule and add the selectors used by the component's temporary data attribute and CSS properties:

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

html[data-magicui-theme-vt="active"]::view-transition-group(root) {
  animation-duration: var(--magicui-theme-toggle-vt-duration);
}

html[data-magicui-theme-vt="active"]::view-transition-new(root) {
  clip-path: var(--magicui-theme-vt-clip-from);
}
```

- [x] **Step 4: Run focused verification**

Run: `pnpm typecheck && pnpm lint`

Expected: both commands exit 0 with no errors or warnings introduced by removed imports or updated code.

### Task 3: Verify and publish the complete requested working tree

**Files:**
- Include: all tracked and untracked files currently in the working tree, including user-authored changes

**Interfaces:**
- Consumes: the complete repository state requested for publication
- Produces: a pushed Git branch containing the design spec, implementation plan, animated theme integration, and the user's pre-existing changes

- [x] **Step 1: Review the complete diff**

Run: `git status --short && git diff --check && git diff --stat && git diff`

Expected: no whitespace errors; every file is understood and no secrets, generated build output, or dependency directories are present.

- [x] **Step 2: Run the full project verification**

Run: `pnpm typecheck && pnpm lint && pnpm build`

Expected: all three commands exit 0; the build prerenders all portfolio routes successfully.

- [x] **Step 3: Confirm repository and authentication state**

Run: `git status -sb && gh auth status && git remote -v`

Expected: an authenticated GitHub session and the intended `SahagunJ16/portfolio` origin.

- [ ] **Step 4: Stage and commit the confirmed whole working tree**

Run:

```bash
git add -A
git diff --cached --check
git diff --cached --stat
git commit -m "feat: add animated theme toggle"
```

Expected: the commit includes the requested theme work and every pre-existing uncommitted change.

- [ ] **Step 5: Push the branch**

Run: `git push -u origin "$(git branch --show-current)"`

Expected: the push succeeds without force and establishes upstream tracking.
