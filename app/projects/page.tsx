"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects";
import { ArrowUpRight, Github } from "lucide-react";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const gridProjects = projects.filter((p) => !p.featured).slice(0, 4);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Featured project slide in
      if (featuredRef.current) {
        gsap.from(featuredRef.current, {
          scrollTrigger: {
            trigger: featuredRef.current,
            start: "top 85%",
          },
          x: -60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }

      // Grid projects stagger in
      if (gridRef.current) {
        const cards = gsap.utils.toArray(".project-card");
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-custom-bg" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold font-heading text-custom-text mb-16 tracking-tight">
          Selected Works
        </h1>

        {/* Featured Project */}
        <div ref={featuredRef} className="mb-24">
          <div className="group relative bg-custom-surface border border-custom-border rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-custom-highlight/50">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative aspect-video lg:aspect-auto overflow-hidden">
                <Image
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center bg-custom-surface z-10">
                <div className="flex items-center gap-4 mb-6">
                  <Badge variant="outline" className="text-custom-accent border-custom-accent">Featured</Badge>
                  <span className="text-custom-muted text-sm">{featuredProject.year}</span>
                </div>
                <h2 className="text-3xl font-bold text-custom-text mb-4 font-heading">{featuredProject.title}</h2>
                <p className="text-custom-muted mb-8 leading-relaxed">
                  {featuredProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-10">
                  {featuredProject.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-custom-surface2 text-custom-text hover:bg-custom-surface2">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4 mt-auto">
                  <Button asChild className="bg-custom-accent text-custom-bg hover:bg-custom-highlight rounded-full">
                    <Link href={featuredProject.live} target="_blank">
                      View Live <ArrowUpRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-custom-border text-custom-text hover:bg-custom-surface2 rounded-full">
                    <Link href={featuredProject.github} target="_blank">
                      <Github className="mr-2 w-4 h-4" /> Code
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gridProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group bg-custom-surface border border-custom-border rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-custom-highlight"
            >
              <div className="relative aspect-video overflow-hidden border-b border-custom-border">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[0.5] group-hover:grayscale-0"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="outline" className="text-custom-muted border-custom-border">{project.category}</Badge>
                  <span className="text-custom-muted text-sm">{project.year}</span>
                </div>
                <h3 className="text-xl font-bold text-custom-text mb-3 font-heading group-hover:text-custom-accent transition-colors">{project.title}</h3>
                <p className="text-custom-muted text-sm mb-6 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs text-custom-muted bg-custom-surface2 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-xs text-custom-muted bg-custom-surface2 px-2 py-1 rounded">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex gap-4">
                  <Link href={project.live} target="_blank" className="text-custom-text hover:text-custom-highlight flex items-center text-sm font-medium transition-colors">
                    Live <ArrowUpRight className="ml-1 w-4 h-4" />
                  </Link>
                  <Link href={project.github} target="_blank" className="text-custom-text hover:text-custom-highlight flex items-center text-sm font-medium transition-colors">
                    GitHub <ArrowUpRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
