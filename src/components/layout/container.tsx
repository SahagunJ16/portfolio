import { cn } from "@/lib/utils";

/**
 * The single measure the whole page is built on. Main content and the detail
 * pages share it so every left edge lines up at every breakpoint.
 */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-4xl px-5 sm:px-8", className)}
      {...props}
    />
  );
}
