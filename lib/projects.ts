export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  live: string;
  github: string;
  featured: boolean;
  year: string;
  category: string;
  image: string;
};

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform Redesign",
    description: "A full-scale architecture overhaul of a major e-commerce platform using Next.js App Router and PostgreSQL. Increased conversion rates by 15%.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    live: "https://example.com",
    github: "https://github.com",
    featured: true,
    year: "2024",
    category: "Full Stack",
    image: "/images/project-1.jpg",
  },
  {
    id: "2",
    title: "Real-time Collaboration Tool",
    description: "A WebSocket-based collaboration tool for remote teams. Features real-time cursors, chat, and document editing.",
    tags: ["React", "Node.js", "Socket.io", "Redis"],
    live: "https://example.com",
    github: "https://github.com",
    featured: false,
    year: "2023",
    category: "Full Stack",
    image: "/images/project-2.jpg",
  },
  {
    id: "3",
    title: "AI-Powered Analytics Dashboard",
    description: "An internal dashboard that aggregates millions of data points and uses LLMs to generate actionable business insights.",
    tags: ["Vue", "Python", "FastAPI", "OpenAI"],
    live: "https://example.com",
    github: "https://github.com",
    featured: false,
    year: "2023",
    category: "Frontend",
    image: "/images/project-3.jpg",
  },
  {
    id: "4",
    title: "High-Performance Image Service",
    description: "A globally distributed microservice written in Go for on-the-fly image resizing, cropping, and optimization.",
    tags: ["Go", "AWS S3", "CloudFront", "Docker"],
    live: "https://example.com",
    github: "https://github.com",
    featured: false,
    year: "2022",
    category: "Backend",
    image: "/images/project-4.jpg",
  },
  {
    id: "5",
    title: "Design System Component Library",
    description: "An open-source React component library with 40+ accessible components, fully documented and tested.",
    tags: ["React", "Tailwind CSS", "Storybook", "Jest"],
    live: "https://example.com",
    github: "https://github.com",
    featured: false,
    year: "2022",
    category: "Frontend",
    image: "/images/project-5.jpg",
  },
];
