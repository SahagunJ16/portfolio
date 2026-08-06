import { SiHackerrank } from "react-icons/si";

import type { CertificationCategory } from "./types";

export const certifications = [
  {
    category: "Software Engineering",
    certifications: [
      {
        name: "Software Engineer Certification",
        issuer: "HackerRank",
        issuerIcon: SiHackerrank,
        issueDate: {
          month: 8,
          year: 2026,
        },
        expirationDate: null,
        credentialId: "4FC0B8CF9274",
        credentialUrl: "https://www.hackerrank.com/certificates/4fc0b8cf9274",
        skills: [
          "Software Engineering",
          "C#",
          "JavaScript",
          "TypeScript",
          "SQL",
          "REST APIs",
          "Problem Solving",
          "Data Analysis",
        ],
      },
    ],
  },
] satisfies CertificationCategory[];
