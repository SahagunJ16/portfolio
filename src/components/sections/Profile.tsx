import type { Profile as ProfileType, Social } from "@/types/portfolio";
import { Icon } from "@iconify/react";
import Image from "next/image";

interface ProfileProps {
  profile: ProfileType;
  socials: Social[];
}

export default function Profile({ profile, socials }: ProfileProps) {
  return (
    <div className="scroll-mt-20" id="profile">
      {profile.avatar ? (
        <Image
          src={profile.avatar}
          width={70}
          height={70}
          className="rounded-[50%] object-cover object-center"
          alt={`${profile.name.first} ${profile.name.last}'s profile`}
          unoptimized
        />
      ) : null}
      <div className="flex gap-[5px] items-center mt-1">
        <h1 className="text-2xl font-semibold">
          {profile.name.first} {profile.name.last}
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm94-278 226-226-56-58-170 170-86-84-56 56 142 142Z" />
        </svg>
      </div>
      <div className="mt-1.5 flex-col items-center gap-1">
        <p className="text-base text-base-content/60">{profile.role}</p>
        <p className="text-xs text-base-content/60">{`// ${profile.role_summary}`}</p>
      </div>
      <div className="flex items-center mt-3 gap-3">
        {socials.map((social) => (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={social.url}
            key={social.name}
            className="inline-block transition-transform duration-200 hover:scale-125 origin-center"
          >
            <Icon icon={`meteor-icons:${social.name}`} />
          </a>
        ))}
      </div>
    </div>
  );
}
