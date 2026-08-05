import { Section } from "@/components/layout/section";
import { CertificationCard } from "@/components/portfolio/certification-card";
import { getAllCertifications } from "@/lib/portfolio";

/**
 * Home page summary: every certification as a card, newest data order.
 * Categories only show on `/certifications`.
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
      <ul className="grid gap-4 sm:grid-cols-2">
        {certifications.map((certification) => (
          <li key={certification.credentialId}>
            <CertificationCard certification={certification} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
