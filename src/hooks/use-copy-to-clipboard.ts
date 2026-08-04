"use client";

import * as React from "react";

interface UseCopyToClipboardOptions {
  /** How long `copied` stays true before resetting. */
  timeout?: number;
}

/**
 * Clipboard write with a short-lived `copied` flag for affordance feedback.
 * Resolves to `false` when the Clipboard API is unavailable or denied, so
 * callers can surface an error instead of silently claiming success.
 */
export function useCopyToClipboard({ timeout = 2000 }: UseCopyToClipboardOptions = {}) {
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copy = React.useCallback(
    async (value: string): Promise<boolean> => {
      if (!navigator.clipboard) return false;

      try {
        await navigator.clipboard.writeText(value);
      } catch {
        return false;
      }

      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), timeout);

      return true;
    },
    [timeout]
  );

  return { copied, copy };
}
