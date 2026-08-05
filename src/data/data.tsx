import type { IconType } from "react-icons";
import { DiMsqlServer } from "react-icons/di";
import { FaJava } from "react-icons/fa6";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";
import { RiOpenaiFill } from "react-icons/ri";
import {
  SiBootstrap,
  SiClaudecode,
  SiCplusplus,
  SiCss,
  SiCursor,
  SiDocker,
  SiDotnet,
  SiEslint,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGithubcopilot,
  SiGnubash,
  SiGooglegemini,
  SiHackerrank,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiModelcontextprotocol,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiPhp,
  SiPnpm,
  SiPostgresql,
  SiPrettier,
  SiReact,
  SiRuby,
  SiRubyonrails,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiTurborepo,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { TbBrandCSharp, TbBrandVscode } from "react-icons/tb";

export interface Profile {
  first_name: string;
  last_name: string;
  birth_date: string;
}

export interface Contact {
  address: string;
  email: string;
  mobile: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: IconType;
}

export interface Overview {
  headlines: string[];
  description: string[];
}

export interface MonthYear {
  month: number;
  year: number;
}

export type WorkLocationType = "On-site" | "Remote" | "Hybrid";
export type EmploymentType = "Full-time" | "Internship";

/**
 * One post held at an organization. Everything that can change between roles
 * at the same employer lives here — including `location`, since a role can go
 * remote without the employer moving.
 */
export interface ExperienceRole {
  title: string;
  location: {
    address: string;
    type: WorkLocationType;
  };
  employment: EmploymentType;
  start: MonthYear;
  end: MonthYear | null;
  summary: string;
  highlights: string[];
}

/**
 * One organization and every role held there.
 *
 * The overall date span is deliberately *not* stored — it is derived from the
 * roles by `getExperienceSpan()`, so it cannot drift out of sync with them.
 */
export interface Experience {
  organization: string;
  /** Organization website, e.g. "https://example.com". Renders as plain text when absent. */
  website?: string;
  /** Filename under public/images/experiences/logos/, e.g. "example.png". Shown as an Avatar with an initials fallback when absent. */
  logo?: string;
  /** Newest first. */
  roles: ExperienceRole[];
}

export interface Education {
  school: string;
  address: string;
  degree: string;
  field: string;
  start: MonthYear;
  end: MonthYear;
  grade: string | null;
  description: string;
}

export interface Skill {
  name: string;
  /** Surfaced in the home page stack summary. Everything shows on /stack. */
  featured?: boolean;
  /** Monotone tech/brand icon, when a real one exists in react-icons. Renders via currentColor — no extra styling needed to stay on-theme. */
  icon?: IconType;
}

export interface StackCategory {
  category: string;
  skills: Skill[];
}

export interface Certification {
  name: string;
  issuer: string;
  /** Monotone brand icon for the issuer, when a real one exists in react-icons. Falls back to a generic badge icon. */
  issuerIcon?: IconType;
  issueDate: MonthYear;
  /** `null` means the credential does not expire. */
  expirationDate: MonthYear | null;
  credentialId: string;
  credentialUrl: string;
  /** Competencies the issuer associates with this credential. */
  skills: string[];
}

export interface CertificationCategory {
  category: string;
  certifications: Certification[];
}

export interface PortfolioData {
  profile: Profile;
  contact: Contact;
  socials: SocialLink[];
  overview: Overview;
  experiences: Experience[];
  educations: Education[];
  stack: StackCategory[];
  certifications: CertificationCategory[];
}

export const DATA = {
  profile: {
    first_name: "Joshua",
    last_name: "Sahagun",
    birth_date: "1996-11-16",
  },
  contact: {
    address: "Sto. Tomas City, Batangas, Philippines 4234",
    email: "joshua_sahagun16@yahoo.com",
    mobile: "+63 967 310 9393",
  },
  socials: [
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
  ],
  overview: {
    headlines: [
      "Full-Stack Software Engineer",
      "SaaS & AI-Enabled Application Development",
      "Automation and Scalable Web Systems",
    ],
    description: [
      "I am a Full-Stack Software Engineer who enjoys turning complex business problems into practical, reliable software.",
      "My experience includes automation tools, internal platforms, operational dashboards, and systems that reduce manual work and improve how teams manage processes and data. I work across the development lifecycle, from understanding requirements and designing solutions to implementation, deployment, and ongoing improvement.",
      "My current focus is modern full-stack web development, SaaS applications, automation, and cloud-based systems. I value maintainable architecture, thoughtful user experiences, and technology choices that fit the needs of the project.",
      "I also use generative and agentic AI to support planning, development, testing, debugging, code review, and documentation. I see AI as a way to improve engineering efficiency while keeping technical judgment and accountability with the developer.",
      "I am particularly interested in software that improves real-world operations and delivers clear, practical value.",
    ],
  },
  experiences: [
    {
      organization: "MC Security Co., Ltd.",
      website: "https://www.mcsecurity.co.jp",
      logo: "mc-security.png",
      roles: [
        {
          title: "System Engineer",
          location: {
            address: "Matsue City, Shimane Prefecture, Japan",
            type: "On-site",
          },
          employment: "Full-time",
          start: {
            month: 4,
            year: 2025,
          },
          end: null,
          summary:
            "Contributing to full-stack development within a network security environment, building operational systems using Ruby on Rails, React/Next.js, and PostgreSQL-backed services within an AWS-based infrastructure.",
          highlights: [
            "Developed a Device Serial Mapping platform to automate dynamic device-to-component relationships, eliminating manual workflows and improving operational efficiency for the support team.",
            "Built a Machine-in-Field (MIF) Installations Monitoring system that transforms raw operational data into structured, high-level insights used across departments for planning and execution.",
            "Designed and deployed a React-based application integrated with a Ruby on Rails REST API, managing build artifacts in Amazon S3 and configuring Amazon CloudFront for application delivery.",
            "Utilize AI-assisted development tools and platforms, including Claude Code, OpenAI Codex, Cursor, Devin AI, and GitHub Copilot, to support implementation, debugging, code review, documentation, testing, and technical analysis.",
            "Contribute to an established agentic development infrastructure by creating and using specialized agents, reusable skills, custom commands, automated hooks, and Model Context Protocol (MCP) integrations.",
            "Apply AI-assisted workflows to improve development speed, code quality, consistency, knowledge sharing, and collaboration while maintaining human review and established engineering standards.",
            "Operate within a Git-based collaborative workflow while expanding hands-on experience with containerized development environments, automated development processes, and cloud deployment practices.",
          ],
        },
        {
          title: "System Engineer",
          location: {
            address: "Matsue City, Shimane Prefecture, Japan",
            type: "Remote",
          },
          employment: "Full-time",
          start: {
            month: 10,
            year: 2022,
          },
          end: {
            month: 3,
            year: 2025,
          },
          summary:
            "Collaborated remotely with engineering team in Japan, contributing to the development and maintenance of internal operational systems and infrastructure-related applications.",
          highlights: [
            "Contributed to full-stack development using React.js and Next.js for frontend applications and Ruby and Ruby on Rails for backend services and REST APIs.",
            "Worked on internal tools and infrastructure-supporting applications used to improve business operations, data management, and employee workflows.",
            "Participated in Git-based development workflows, including issue tracking, code reviews, testing, and technical discussions within a remote team environment.",
            "Developed and maintained features using PostgreSQL, Linux-based environments, containerized development workflows, and technologies aligned with the company's production stack.",
            "Analyzed technical requirements, implemented assigned features and fixes, and supported testing and deployment activities.",
            "Gained practical experience working remotely with a Japan-based engineering organization before relocating to Japan and transitioning into an on-site role.",
          ],
        },
      ],
    },
    {
      organization: "Collins Aerospace",
      website:
        "https://www.rtx.com/collinsaerospace/who-we-are/about-us/global/asia/philippines",
      logo: "collins-aerospace.png",
      roles: [
        {
          title: "Business System Analyst III",
          employment: "Full-time",
          location: {
            address: "Tanauan City, Batangas, Philippines",
            type: "On-site",
          },
          start: {
            month: 3,
            year: 2022,
          },
          end: {
            month: 9,
            year: 2022,
          },
          summary:
            "Progressed to lead complex operational initiatives and enterprise-level system enhancements within a large-scale manufacturing environment.",
          highlights: [
            "Architected and delivered enterprise operational platforms integrating scheduling, automated notifications, forecasting, and process control mechanisms.",
            "Designed and enhanced integrated workstation monitoring and certification validation systems enforcing training compliance and enabling real-time operational visibility.",
            "Served as primary developer for major internal systems, responsible for system architecture, database design, UI development, deployment, stakeholder presentation, and long-term maintenance.",
          ],
        },
        {
          title: "Business System Analyst II",
          employment: "Full-time",
          location: {
            address: "Tanauan City, Batangas, Philippines",
            type: "On-site",
          },
          start: {
            month: 3,
            year: 2021,
          },
          end: {
            month: 3,
            year: 2022,
          },
          summary:
            "Progressed into expanded ownership of operational systems across the site.",
          highlights: [
            "Led development of department-wide applications and automation platforms replacing fragmented manual processes with structured, database-backed systems.",
            "Designed systems supporting transportation logistics, production tracking, and compliance monitoring across manufacturing operations.",
            "Collaborated directly with stakeholders and management to gather requirements, present technical solutions, and deploy production-ready applications.",
            "Contributed to workstation monitoring and operator validation systems used within the manufacturing floor.",
          ],
        },
        {
          title: "Business System Analyst",
          employment: "Full-time",
          location: {
            address: "Tanauan City, Batangas, Philippines",
            type: "Hybrid",
          },
          start: {
            month: 9,
            year: 2019,
          },
          end: {
            month: 3,
            year: 2021,
          },
          summary:
            "Joined a manufacturing-focused business unit to develop and support internal systems that improved operational efficiency across departments.",
          highlights: [
            "Developed database-driven applications and automation tools supporting manufacturing, supply chain, and operational teams.",
            "Built internal dashboards and tracking systems to improve visibility of production and logistics data while reducing manual reporting processes.",
            "Assisted in requirements gathering, system analysis, and troubleshooting within a large enterprise environment.",
            "Provided technical support for workstation-level applications to ensure continuity of business-critical workflows.",
          ],
        },
      ],
    },
    {
      organization: "Kinpo Electronics (Philippines), Inc.",
      website: "https://www.kinpogroup.com/en-US/",
      logo: "kinpo-electronics.png",
      roles: [
        {
          title: "Software Engineer II",
          employment: "Full-time",
          location: {
            address: "Lipa City, Batangas, Philippines",
            type: "On-site",
          },
          start: {
            month: 6,
            year: 2018,
          },
          end: {
            month: 9,
            year: 2019,
          },
          summary:
            "Progressed into expanded technical responsibility, focusing on performance optimization, computational geometry, and mentoring within the 3D software team.",
          highlights: [
            "Initiated and led experimental migration of a C# (WPF) 3D application to C++ (Qt) to improve performance when processing high-volume geometric models.",
            "Implemented vector- and polygon-based computational logic to enhance model loading and rendering efficiency.",
            "Designed and developed a dynamic support bed generation feature that adapts to model geometry and placement, incorporating a honeycomb structural pattern to optimize resin usage while maintaining load stability.",
            "Evaluated architectural trade-offs and performance improvements during the porting process.",
            "Mentored a junior engineer and managed staging releases in coordination with international teams.",
          ],
        },
        {
          title: "Software Engineer",
          employment: "Full-time",
          location: {
            address: "Lipa City, Batangas, Philippines",
            type: "On-site",
          },
          start: {
            month: 6,
            year: 2017,
          },
          end: {
            month: 6,
            year: 2018,
          },
          summary:
            "Joined a 3D printer software engineering team contributing to desktop application development and custom C# library extensions supporting model processing workflows.",
          highlights: [
            "Developed a desktop application for automated 3D seal/stamp generation, enabling users to create customizable 3D models without requiring manual modeling tools.",
            "Built custom C# libraries extending core 3D software functionality, including automated support-structure generation optimized for material efficiency and print stability.",
            "Implemented user-adjustable support logic allowing scaling, cloning, and selective modification of generated structures.",
            "Created internal QA and log-analysis tools to streamline troubleshooting and improve workflow efficiency.",
            "Collaborated with international engineering teams during feature integration and staging releases.",
          ],
        },
      ],
    },
    {
      organization: "Nexperia",
      website: "https://www.nexperia.com",
      logo: "nexperia.png",
      roles: [
        {
          title: "Junior Software Engineer",
          employment: "Internship",
          location: {
            address: "Cabuyao City, Laguna, Philippines",
            type: "On-site",
          },
          start: {
            month: 11,
            year: 2016,
          },
          end: {
            month: 6,
            year: 2017,
          },
          summary:
            "Completed a long-term internship supporting internal software development within a semiconductor manufacturing environment.",
          highlights: [
            "Contributed to the development and maintenance of internal web and desktop applications using C#, ASP.NET, and VB.NET.",
            "Implemented feature enhancements and optimizations based on user requirements, improving usability and workflow efficiency.",
            "Developed Excel-based automation tools using VBA for data extraction, reporting, and operational support.",
            "Assisted in debugging, code refinement, and performance improvements under senior engineer guidance.",
            "Documented system changes and collaborated with cross-functional teams to ensure smooth deployment of updates.",
          ],
        },
      ],
    },
  ],
  educations: [
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
  ],
  stack: [
    {
      category: "Languages",
      skills: [
        { name: "TypeScript", featured: true, icon: SiTypescript },
        { name: "JavaScript", icon: SiJavascript },
        { name: "Ruby", featured: true, icon: SiRuby },
        { name: "C#", icon: TbBrandCSharp },
        { name: "PHP", icon: SiPhp },
        { name: "Java", icon: FaJava },
        { name: "C++", icon: SiCplusplus },
        { name: "VB.NET" },
        { name: "SQL" },
        { name: "VBA" },
        { name: "Bash", icon: SiGnubash },
        { name: "HTML", icon: SiHtml5 },
        { name: "CSS", icon: SiCss },
      ],
    },
    {
      category: "Frontend",
      skills: [
        { name: "React", featured: true, icon: SiReact },
        { name: "Next.js", featured: true, icon: SiNextdotjs },
        { name: "Tailwind CSS", featured: true, icon: SiTailwindcss },
        { name: "Bootstrap", icon: SiBootstrap },
        { name: "shadcn/ui", icon: SiShadcnui },
        { name: "Vite", icon: SiVite },
      ],
    },
    {
      category: "Backend",
      skills: [
        { name: "Ruby on Rails", featured: true, icon: SiRubyonrails },
        { name: "Node.js", icon: SiNodedotjs },
        { name: "Laravel", icon: SiLaravel },
        { name: "ASP.NET" },
        { name: "REST APIs" },
      ],
    },
    {
      category: "Data",
      skills: [
        { name: "PostgreSQL", featured: true, icon: SiPostgresql },
        { name: "MySQL", icon: SiMysql },
        { name: "Microsoft SQL Server", icon: DiMsqlServer },
        { name: "Supabase", featured: true, icon: SiSupabase },
      ],
    },
    {
      category: "Cloud & Infrastructure",
      skills: [
        { name: "Amazon S3" },
        { name: "Amazon CloudFront" },
        { name: "Vercel", featured: true, icon: SiVercel },
        { name: "Docker", featured: true, icon: SiDocker },
        { name: "WSL" },
      ],
    },
    {
      category: "AI & Agentic Tooling",
      skills: [
        { name: "Claude Code", featured: true, icon: SiClaudecode },
        { name: "OpenAI Codex", icon: RiOpenaiFill },
        { name: "Cursor", icon: SiCursor },
        { name: "GitHub Copilot", icon: SiGithubcopilot },
        { name: "Devin AI" },
        { name: "Gemini", icon: SiGooglegemini },
        { name: "MCP (Model Context Protocol)", featured: true, icon: SiModelcontextprotocol },
      ],
    },
    {
      category: "Desktop",
      skills: [
        { name: "WPF (C#)" },
        { name: "WinForms (C#)" },
        { name: "WinUI (C#)" },
        { name: ".NET", icon: SiDotnet },
      ],
    },
    {
      category: "Tooling & Workflow",
      skills: [
        { name: "Git", featured: true, icon: SiGit },
        { name: "GitHub", icon: SiGithub },
        { name: "GitHub Actions", icon: SiGithubactions },
        { name: "VS Code", icon: TbBrandVscode },
        { name: "pnpm", icon: SiPnpm },
        { name: "npm", icon: SiNpm },
        { name: "ESLint", icon: SiEslint },
        { name: "Prettier", icon: SiPrettier },
        { name: "Turborepo", icon: SiTurborepo },
      ],
    },
  ],
  certifications: [
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
  ],
} satisfies PortfolioData;
