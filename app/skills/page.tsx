"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/components/animations/SplitText";
import { 
  Monitor, Server, Database, Wrench, 
  Code2, Braces, Layers, Cpu, Cloud,
  GitBranch, Terminal, Shield, Blocks
} from "lucide-react";

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      title: "Frontend",
      icon: <Monitor className="w-6 h-6 text-blue-400" />,
      skills: [
        { name: "React / Next.js", level: "Expert", icon: <Code2 className="w-5 h-5 text-custom-muted" /> },
        { name: "TypeScript", level: "Expert", icon: <Braces className="w-5 h-5 text-custom-muted" /> },
        { name: "Tailwind CSS", level: "Expert", icon: <Layers className="w-5 h-5 text-custom-muted" /> },
        { name: "GSAP / Framer", level: "Advanced", icon: <Layers className="w-5 h-5 text-custom-muted" /> },
      ]
    },
    {
      title: "Backend",
      icon: <Server className="w-6 h-6 text-green-400" />,
      skills: [
        { name: "Node.js", level: "Expert", icon: <Terminal className="w-5 h-5 text-custom-muted" /> },
        { name: "Python", level: "Advanced", icon: <Terminal className="w-5 h-5 text-custom-muted" /> },
        { name: "Go", level: "Proficient", icon: <Cpu className="w-5 h-5 text-custom-muted" /> },
        { name: "GraphQL / REST", level: "Advanced", icon: <Blocks className="w-5 h-5 text-custom-muted" /> },
      ]
    },
    {
      title: "DB & Cloud",
      icon: <Database className="w-6 h-6 text-purple-400" />,
      skills: [
        { name: "PostgreSQL", level: "Expert", icon: <Database className="w-5 h-5 text-custom-muted" /> },
        { name: "MongoDB", level: "Advanced", icon: <Database className="w-5 h-5 text-custom-muted" /> },
        { name: "Redis", level: "Proficient", icon: <Database className="w-5 h-5 text-custom-muted" /> },
        { name: "AWS", level: "Advanced", icon: <Cloud className="w-5 h-5 text-custom-muted" /> },
      ]
    },
    {
      title: "Tools & Practices",
      icon: <Wrench className="w-6 h-6 text-orange-400" />,
      skills: [
        { name: "Git / CI/CD", level: "Expert", icon: <GitBranch className="w-5 h-5 text-custom-muted" /> },
        { name: "Docker", level: "Advanced", icon: <Layers className="w-5 h-5 text-custom-muted" /> },
        { name: "System Design", level: "Advanced", icon: <Blocks className="w-5 h-5 text-custom-muted" /> },
        { name: "Testing (Jest)", level: "Advanced", icon: <Shield className="w-5 h-5 text-custom-muted" /> },
      ]
    }
  ];

  const currentlyLearning = "Rust · WebAssembly · LLM APIs · WebGL · Three.js · Micro-frontends · ";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Title char reveal
      gsap.from(".title-char", {
        scrollTrigger: {
          trigger: ".title-trigger",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.05,
        ease: "back.out(1.7)",
        duration: 0.8,
      });

      // Columns stagger
      if (columnsRef.current) {
        const columns = gsap.utils.toArray(".skill-col");
        gsap.from(columns, {
          scrollTrigger: {
            trigger: columnsRef.current,
            start: "top 80%",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-0 bg-custom-bg flex flex-col" ref={sectionRef}>
      <div className="container mx-auto px-6 flex-grow flex flex-col">
        <h1 className="title-trigger text-4xl md:text-5xl font-bold font-heading text-custom-text mb-16 tracking-tight overflow-hidden">
          <SplitText text="Technical Arsenal" charClassName="title-char inline-block" />
        </h1>

        <div ref={columnsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 flex-grow">
          {skillCategories.map((category) => (
            <div key={category.title} className="skill-col flex flex-col gap-6">
              <div className="flex items-center gap-3 border-b border-custom-border pb-4">
                {category.icon}
                <h2 className="text-xl font-semibold text-custom-text">{category.title}</h2>
              </div>
              <div className="flex flex-col gap-4">
                {category.skills.map((skill) => (
                  <div 
                    key={skill.name}
                    className="group bg-custom-surface border border-custom-border p-4 rounded-xl flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-custom-highlight hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                  >
                    <div className="bg-custom-surface2 p-2 rounded-lg group-hover:text-custom-highlight transition-colors">
                      {skill.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-custom-text font-medium">{skill.name}</span>
                      <span className="text-xs text-custom-muted">{skill.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Currently Learning Bar */}
      <div className="mt-auto border-y border-custom-border py-4 bg-custom-surface2/50 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-custom-bg to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-custom-bg to-transparent z-10" />
        <div className="flex whitespace-nowrap animate-marquee items-center">
          <span className="text-custom-muted uppercase tracking-widest text-sm font-semibold mr-8">Currently Exploring:</span>
          <span className="text-lg font-heading tracking-widest text-custom-text px-4">{currentlyLearning}</span>
          <span className="text-lg font-heading tracking-widest text-custom-text px-4">{currentlyLearning}</span>
        </div>
      </div>
    </div>
  );
}
