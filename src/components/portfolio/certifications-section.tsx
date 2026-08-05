import { Section } from "@/components/layout/section";
import { formatMonthYear, toIsoMonth } from "@/lib/format";
import { getAllCertifications } from "@/lib/portfolio";

/**
 * Home page summary: every certification, newest first, linking straight out
 * to the credential. Categories only show on `/certifications`.
 */
export function CertificationsSection() {
  const certifications = getAllCertifications();

  return (
    <Section
      id="certifications"
      label="Certifications"
      description="Credentials that back up the skills above."
      viewAllCount={certifications.length}
    >
      <ul className="flex flex-col divide-y divide-border">
        {certifications.map((certification) => (
          <li
            key={certification.credentialId}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 first:pt-0 last:pb-0"
          >
            <div className="flex flex-col gap-0.5">
              <a
                href={certification.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                {certification.name}
              </a>
              <span className="text-sm text-muted-foreground">{certification.issuer}</span>
            </div>

            <time
              dateTime={toIsoMonth(certification.issueDate)}
              className="label-mono shrink-0 text-muted-foreground"
            >
              {formatMonthYear(certification.issueDate)}
            </time>
          </li>
        ))}
      </ul>
    </Section>
  );
}
