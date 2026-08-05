import Image from "next/image";
import { ArrowDownIcon, FileTextIcon, MailIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SocialLinks } from "@/components/social-links";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/data";
import {
  getFullName,
  getInitials,
  getPublicLocation,
  getYearsOfExperience,
} from "@/lib/portfolio";
import { AVATAR_PATH, RESUME_PATH } from "@/lib/seo";

/**
 * Opening block: the only `<h1>` on the page, the headline stack, location,
 * and the primary calls to action.
 */
export function Hero() {
  const fullName = getFullName();
  const [primaryHeadline, ...supportingHeadlines] = DATA.overview.headlines;

  return (
    <Container id="top" className="py-16 sm:py-24 lg:py-28">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
        {/*
          No `size` prop: its `data-[size=lg]:size-10` is an attribute-scoped
          rule that outranks a plain `size-*` class, so it would silently win
          over the sizing below. Left at the default, tailwind-merge resolves
          these normally.
        */}
        <Avatar className="size-28 shrink-0 sm:size-36">
          {/*
            Routed through next/image so the source file is resized and served
            as AVIF/WebP rather than shipping the full-resolution original.
            `priority` because this is above the fold.
          */}
          <AvatarImage
            src={AVATAR_PATH}
            render={
              <Image
                src={AVATAR_PATH}
                alt={`Portrait of ${fullName}`}
                width={288}
                height={288}
                sizes="144px"
                priority
              />
            }
            className="bg-background"
          />

          <AvatarFallback className="bg-background font-heading text-4xl">
            {getInitials()}
          </AvatarFallback>
        </Avatar>

        <div className="flex min-w-0 flex-col gap-5">
          <div className="flex flex-col gap-3">
            <p className="label-mono">
              {getYearsOfExperience()}+ years building software
            </p>

            <h1 className="font-heading text-4xl leading-[1.05] tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
              {fullName}
            </h1>

            <p className="max-w-xl text-lg text-pretty text-foreground sm:text-xl">
              {primaryHeadline}
            </p>

            {supportingHeadlines.length > 0 && (
              <ul className="flex flex-col gap-1">
                {supportingHeadlines.map((headline) => (
                  <li
                    key={headline}
                    className="flex items-baseline gap-2 text-sm text-muted-foreground"
                  >
                    <span aria-hidden className="text-border">
                      /
                    </span>
                    <span className="text-pretty">{headline}</span>
                  </li>
                ))}
              </ul>
            )}

            <p className="label-mono pt-1">{getPublicLocation()}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* nativeButton={false}: Base UI needs to know this renders an <a>, not a <button>. */}
            <Button
              nativeButton={false}
              render={<a href={`mailto:${DATA.contact.email}`} />}
            >
              <MailIcon aria-hidden />
              <span>Get in touch</span>
            </Button>

            <Button
              variant="outline"
              nativeButton={false}
              render={
                <a
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <FileTextIcon aria-hidden />
              <span>Resume</span>
            </Button>

            <SocialLinks />
          </div>
        </div>
      </div>

      <a
        href="#overview"
        className="label-mono mt-14 inline-flex items-center gap-2 transition-colors hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
      >
        <ArrowDownIcon className="size-3" aria-hidden />
        <span>Scroll to explore</span>
      </a>
    </Container>
  );
}
