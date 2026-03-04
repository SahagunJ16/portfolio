import type { Profile } from "@/types/portfolio";
import { ExpandableText } from "@/components/ui";

interface AboutProps {
  profile: Profile;
}

export default function About({ profile }: AboutProps) {
  return (
    <div className="flex flex-col gap-2 mt-10 scroll-mt-14" id="about">
      <h2 className="text-xl font-medium before:content-['>'] before:mr-1">About</h2>
      <div className="flex flex-col gap-3">
        <ExpandableText className="text-sm text-base-content/80">
          {profile.about}
        </ExpandableText>
        <p className="text-sm text-base-content/80">
          If you&apos;ve got any questions or just feel like chatting, send me an{" "}
          <a href={`mailto:${profile.email}`} className="font-bold hover:underline cursor-pointer">
            email
          </a>
          . I&apos;d love to hear from you.
        </p>
      </div>
    </div>
  );
}
