import { ArrowUpRightIcon, BadgeCheckIcon } from "lucide-react";

import { TagList } from "@/components/tag-list";
import type { Certification } from "@/data/data";
import { formatMonthYear, toIsoMonth } from "@/lib/format";

interface CertificationCardProps {
  certification: Certification;
}

/**
 * A single credential, styled like a minimal certificate: issuer above the
 * name, a verification mark, dates and ID as a mono meta line, the issuer's
 * own skill tags, and a link out to verify it. `bg-card` (pure white, vs the
 * page's off-white `--background`) is what reads as a card here — the same
 * layering trick the design already relies on, just not used by a component
 * until now.
 */
export function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 border border-border bg-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="label-mono text-muted-foreground/60">{certification.issuer}</span>
          <h3 className="font-heading text-lg tracking-tight text-pretty text-foreground">
            {certification.name}
          </h3>
        </div>
        <BadgeCheckIcon aria-hidden className="size-5 shrink-0 text-muted-foreground" />
      </div>

      <div className="label-mono flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground">
        <time dateTime={toIsoMonth(certification.issueDate)}>
          {formatMonthYear(certification.issueDate)}
        </time>
        {certification.expirationDate && (
          <>
            <span aria-hidden>–</span>
            <time dateTime={toIsoMonth(certification.expirationDate)}>
              {formatMonthYear(certification.expirationDate)}
            </time>
          </>
        )}
        <span aria-hidden className="text-border">
          /
        </span>
        <span>ID {certification.credentialId}</span>
      </div>

      {certification.skills.length > 0 && (
        <TagList
          items={certification.skills.map((skill) => ({ name: skill }))}
          label={`Skills for ${certification.name}`}
          className="gap-2"
        />
      )}

      <a
        href={certification.credentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="label-mono mt-auto inline-flex items-center gap-1.5 pt-1 text-foreground underline-offset-4 hover:underline"
      >
        <span>View credential</span>
        <ArrowUpRightIcon aria-hidden className="size-3" />
      </a>
    </article>
  );
}
