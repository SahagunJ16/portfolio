# Animated Theme Toggle Design

## Goal

Replace the portfolio's three-option light, system, and dark selector with one animated light/dark button. On a visitor's first load, the effective theme follows the operating-system preference. After the visitor toggles it, the selected light or dark theme is persisted.

The animated button will be the only theme control. The command palette will no longer expose light, dark, or system commands.

## Architecture

Keep `next-themes` as the single source of truth for initialization, persistence, and synchronization. The existing provider remains configured with `defaultTheme="system"` and `enableSystem`, allowing the initial theme to follow the operating system without exposing system as a selectable UI state.

`ThemeToggle` becomes a small integration wrapper around `AnimatedThemeToggler`. It reads `resolvedTheme` from `next-themes`, passes the effective `light` or `dark` value to the animated control, and persists changes through `setTheme`. The animated component remains responsible only for its button, icon, and View Transitions reveal.

The standalone local-storage mode in `AnimatedThemeToggler` will not be used by the portfolio. This avoids competing persistence and DOM-class ownership between the component and `next-themes`.

## Behavior and UI

- Render one icon button in every existing `ThemeToggle` placement: desktop sidebar, tablet header, and mobile navigation drawer.
- Use the animated component's circular reveal, originating at the clicked button, with its default duration.
- Show a moon when the next action is to enter dark mode and a sun when the next action is to enter light mode.
- Disable the button until client hydration establishes the effective theme. This prevents a fast click from choosing the wrong opposite theme when the operating system is dark.
- Give the button an accessible action label and title that reflect the next theme.
- Style the button with the project's existing small icon-button conventions and semantic color tokens.
- Remove the Theme group, theme-related imports, and theme-related copy from the command palette.

## Theme Data Flow

1. Before paint, `next-themes` resolves the saved theme or, when none exists, the operating-system preference and applies the matching root class.
2. After hydration, `ThemeToggle` maps `resolvedTheme` to `light` or `dark` and enables the button.
3. On activation, `AnimatedThemeToggler` starts a root View Transition and synchronously applies the opposite root class for the transition snapshot.
4. The wrapper calls `setTheme` with that same explicit light or dark value. `next-themes` persists it and remains the authoritative state owner.
5. All mounted toggle instances update from the shared provider state.

## Motion and Fallbacks

Browsers supporting the View Transitions API receive the circular theme reveal. Browsers without it change themes immediately through the same controlled callback.

When `prefers-reduced-motion: reduce` is active, the control changes the theme without running the reveal animation. Global View Transition styles will be formatted, scoped, and extended only as needed for the component's transition lifecycle; they must not interfere with unrelated animations.

Repeated activation while a transition is active remains ignored, preventing overlapping root transitions.

## Error Handling

No runtime error UI is necessary. Theme switching is entirely local. If the View Transitions API or its animation promise is unavailable, the component falls back to applying the theme immediately. Transition cleanup must run after completion so temporary root attributes and custom properties cannot leak into later interactions.

## Verification

- Run `pnpm typecheck`, `pnpm lint`, and `pnpm build`.
- Confirm a fresh session follows both light and dark operating-system preferences.
- Confirm toggling from either initial preference selects and persists the opposite explicit theme across reloads.
- Confirm every responsive placement renders one usable toggle and mounted instances stay synchronized.
- Confirm mouse and keyboard activation, focus visibility, icon state, action label, and disabled pre-hydration state.
- Confirm unsupported View Transitions behavior changes theme without animation.
- Confirm reduced-motion behavior changes theme without the reveal.
- Confirm the command palette has no theme group, theme search copy, or unused theme imports.

## Scope

This change does not remove `next-themes`, alter the portfolio's color tokens, add new theme modes, or redesign the navigation. Existing unrelated uncommitted UI work remains untouched.
