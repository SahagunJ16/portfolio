import { Container } from "@/components/layout/container";
import { DATA } from "@/data/data";
import { getFullName, getPublicLocation } from "@/lib/portfolio";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <span className="label-mono">Get in touch</span>
          <a
            href={`mailto:${DATA.contact.email}`}
            className="font-heading text-lg break-words text-foreground underline-offset-4 hover:underline"
          >
            {DATA.contact.email}
          </a>
          <span className="text-xs text-muted-foreground">{getPublicLocation()}</span>
        </div>

        <p className="text-xs text-muted-foreground">
          © {year} {getFullName()}
        </p>
      </Container>
    </footer>
  );
}
