"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  /** What was copied, used in the toast — e.g. "Email address". */
  label: string;
  className?: string;
}

export function CopyButton({ value, label, className }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard();

  async function handleCopy() {
    const ok = await copy(value);

    if (ok) {
      toast.success(`${label} copied`, { description: value });
    } else {
      toast.error(`Could not copy ${label.toLowerCase()}`, {
        description: "Your browser blocked clipboard access.",
      });
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleCopy}
            className={cn("text-muted-foreground hover:text-foreground", className)}
            aria-label={`Copy ${label.toLowerCase()}`}
          />
        }
      >
        {copied ? <CheckIcon aria-hidden /> : <CopyIcon aria-hidden />}
      </TooltipTrigger>
      <TooltipContent>{copied ? "Copied" : `Copy ${label.toLowerCase()}`}</TooltipContent>
    </Tooltip>
  );
}
