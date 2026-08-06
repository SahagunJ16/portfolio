import type { Education } from "./types";

export const educations = [
  {
    school: "STI College - Tanauan",
    address: "Tanauan City, Batangas, Philippines",
    degree: "Bachelor of Science",
    field: "Information Technology",
    start: {
      month: 6,
      year: 2013,
    },
    end: {
      month: 4,
      year: 2017,
    },
    grade: null,
    description:
      "Focused on computer programming and software development fundamentals, including object-oriented programming, database systems, and application development. Actively participated in programming competitions, strengthening analytical problem-solving and algorithmic thinking.",
  },
] satisfies Education[];
