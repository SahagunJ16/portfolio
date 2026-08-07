import type { Award } from "./types";

/** Newest first. Flat — unlike `stack` and `certifications`, there is no category layer. */
export const awards = [
  {
    title: "Best IT Special Project (Thesis) Awardee",
    issuer: "STI College - Tanauan",
    issueDate: {
      month: 4,
      year: 2017,
    },
    description:
      "Awarded for a collaborative thesis project focused on developing an attendance monitoring system integrating mobile and web technologies.",
  },
  {
    title: "Best Programmer of the Year Awardee",
    issuer: "STI College - Tanauan",
    issueDate: {
      month: 4,
      year: 2017,
    },
    description:
      "Awarded for consistent performance in competitive programming and technical project excellence during undergraduate studies.",
  },
  {
    title: "3rd Place – UnionBank U:Hac 4.0 STI Edition Hackathon",
    issuer: "UnionBank of the Philippines",
    issueDate: {
      month: 12,
      year: 2016,
    },
    description:
      "Represented STI College - Tanauan at UnionBank U:Hac 4.0 STI Edition, earning 3rd place for an NFC-enabled attendance monitoring prototype with SMS alert capability for guardians.",
  },
] satisfies Award[];
