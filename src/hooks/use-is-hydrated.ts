"use client";

import * as React from "react";

const subscribe = () => () => {};

/**
 * `false` during SSR and the first client render, `true` afterwards.
 *
 * Uses `useSyncExternalStore` rather than the `useState` + `useEffect` pattern
 * so it never schedules a synchronous state update from an effect body — which
 * causes a cascading render and is flagged by `react-hooks/set-state-in-effect`.
 *
 * Needed for anything whose correct output is unknowable on the server, such
 * as the resolved colour theme.
 */
export function useIsHydrated(): boolean {
  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
