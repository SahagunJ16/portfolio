import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";

import type { SocialLink } from "./types";

export const socials = [
  {
    label: "LinkedIn",
    url: "linkedin.com/in/sahagunj16",
    icon: IoLogoLinkedin,
  },
  {
    label: "Github",
    url: "github.com/sahagunj16",
    icon: IoLogoGithub,
  },
] satisfies SocialLink[];
