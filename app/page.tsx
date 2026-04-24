"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/components/animations/SplitText";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Download } from "lucide-react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Hero char animation
      tl.from(".hero-char", {
        y: 120,
        opacity: 0,
        stagger: 0.04,
        ease: "power4.out",
        duration: 1,
      })
      // Subtitle fade up
      .from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, "-=0.4")
      // CTAs pop in
      .from(".hero-cta", {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      }, "-=0.2")
      // Image slides in
      .from(".hero-image", {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
      }, "-=0.8");

      // Parallax on scroll
      gsap.to(textRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const marqueeText = "React · Node.js · Python · Go · AWS · TypeScript · Next.js · PostgreSQL · GraphQL · Docker · ";

  return (
    <div className="relative min-h-screen overflow-hidden" ref={containerRef}>
      <div className="noise-overlay" />
      
      <div className="container mx-auto px-6 pt-32 pb-20 min-h-screen flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col relative" ref={textRef}>
            <p className="hero-sub text-custom-accent uppercase tracking-[0.2em] text-sm font-semibold mb-6 flex items-center gap-4">
              <span className="w-12 h-px bg-custom-accent/50" />
              Available for hire
            </p>
            
            <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-bold font-heading leading-[0.9] tracking-tighter mb-8 text-custom-text">
              <SplitText text="FULL" className="block" />
              <SplitText text="STACK" className="block text-custom-accent2" />
              <SplitText text="ENGINEER" className="block" />
            </h1>
            
            <p className="hero-sub text-xl md:text-2xl text-custom-muted max-w-xl mb-12 font-light leading-relaxed">
              Building products that scale. I engineer robust solutions with a focus on exceptional user experiences.
            </p>
            
            <div className="flex flex-wrap gap-6 items-center">
              <Button asChild size="lg" className="hero-cta bg-custom-accent text-custom-bg hover:bg-custom-highlight text-lg px-8 h-14 rounded-full">
                <Link href="/projects">
                  View Work <ArrowUpRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="hero-cta border-custom-border text-custom-text hover:bg-custom-surface2 hover:text-custom-highlight text-lg px-8 h-14 rounded-full bg-transparent">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Download CV <Download className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative hero-image perspective-1000 hidden md:block">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-custom-border bg-custom-surface p-2 transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out">
              <div className="absolute inset-0 bg-gradient-to-tr from-custom-accent/20 to-transparent z-10 mix-blend-overlay rounded-2xl pointer-events-none" />
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                alt="3D Avatar"
                fill
                priority
                className="object-cover rounded-2xl filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-10 left-0 w-full overflow-hidden border-y border-custom-border/50 py-4 bg-custom-surface/30 backdrop-blur-sm z-20">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-xl font-heading tracking-widest text-custom-muted/50 uppercase px-4">{marqueeText}</span>
          <span className="text-xl font-heading tracking-widest text-custom-muted/50 uppercase px-4">{marqueeText}</span>
        </div>
      </div>

      {/* Featured Works Preview */}
      <section className="py-32 bg-custom-bg relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-custom-accent uppercase tracking-widest text-sm font-semibold mb-4 block">// SELECTED WORKS</span>
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-custom-text">Featured Projects</h2>
            </div>
            <Link href="/projects" className="text-custom-muted hover:text-custom-highlight transition-colors flex items-center gap-2 group">
              View all <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group cursor-pointer">
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-custom-border">
                <Image 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" 
                  alt="Project 1" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-bold text-custom-text mb-2 font-heading group-hover:text-custom-accent transition-colors">E-Commerce Platform</h3>
              <p className="text-custom-muted">Next.js · TypeScript · Stripe</p>
            </div>
            <div className="group cursor-pointer">
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-custom-border">
                <Image 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" 
                  alt="Project 2" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-bold text-custom-text mb-2 font-heading group-hover:text-custom-accent transition-colors">Analytics Dashboard</h3>
              <p className="text-custom-muted">React · D3.js · Node.js</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section Preview */}
      <section className="py-32 bg-custom-surface/30 relative z-10 border-t border-custom-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold font-heading text-custom-text mb-16 tracking-tight">
            I specialize in building <br />
            <span className="text-custom-accent">performant applications.</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
            {["Frontend", "Backend", "Cloud Architecture", "Performance", "UI/UX"].map((skill) => (
              <div key={skill} className="px-8 py-4 rounded-full border border-custom-border text-custom-muted hover:border-custom-highlight hover:text-custom-text transition-all duration-300">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
