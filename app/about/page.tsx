"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Stats counter animation
      const statNumbers = gsap.utils.toArray<HTMLElement>(".stat-num");
      if (statNumbers.length > 0) {
        gsap.from(statNumbers, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
          textContent: 0,
          snap: { textContent: 1 },
          duration: 2,
          ease: "power2.out",
          stagger: 0.2,
        });
      }

      // Image clip-path reveal
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
          },
          clipPath: "inset(0% 0 0 0)",
          duration: 1.5,
          ease: "power3.inOut",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-custom-bg" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="font-mono text-custom-muted mb-6 tracking-wider">
              // 01 ABOUT
            </span>
            
            <h2 
              ref={headingRef}
              className="text-4xl md:text-5xl font-bold font-heading text-custom-text mb-8 tracking-tight leading-tight"
            >
              I build things that matter.
            </h2>
            
            <div className="space-y-6 text-lg text-custom-muted font-light leading-relaxed mb-12">
              <p>
                As a software engineer, I've always been fascinated by the intersection of complex problem-solving and intuitive design. My journey started with a simple curiosity about how the web works, which quickly evolved into a passion for building scalable, high-performance applications.
              </p>
              <p>
                My engineering philosophy is simple: write code that is as elegant under the hood as the experience it delivers. I believe in the power of strong architecture, rigorous testing, and continuous learning to push the boundaries of what's possible on the web.
              </p>
              <p>
                Currently, I'm focused on developing full-stack solutions using Next.js and Go, exploring the potential of AI-driven interfaces, and contributing to the open-source community that gave me my start.
              </p>
            </div>
            
            <div ref={statsRef} className="grid grid-cols-3 gap-6 mb-12 border-y border-custom-border py-8">
              <div>
                <div className="text-3xl font-bold text-custom-accent mb-2 flex items-center">
                  <span className="stat-num">3</span>+
                </div>
                <div className="text-sm text-custom-muted uppercase tracking-wider">Years Exp.</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-custom-accent mb-2 flex items-center">
                  <span className="stat-num">20</span>+
                </div>
                <div className="text-sm text-custom-muted uppercase tracking-wider">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-custom-accent mb-2 flex items-center">
                  <span className="stat-num">5</span>
                </div>
                <div className="text-sm text-custom-muted uppercase tracking-wider">OSS Contribs</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-custom-accent text-custom-bg hover:bg-custom-highlight">
                <Link href="/contact">Let's Talk</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-custom-border text-custom-text hover:bg-custom-surface2">
                <Link href="https://blog.example.com">
                  Read my Blog <ArrowUpRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="lg:col-span-5 flex flex-col pt-12 lg:pt-0">
            <div 
              ref={imageRef} 
              className="relative w-full aspect-[3/4] mb-8 rounded-2xl overflow-hidden"
              style={{ clipPath: "inset(100% 0 0 0)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"
                alt="John Doe"
                fill
                className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            
            <div className="bg-custom-surface border border-custom-border p-4 rounded-xl flex items-center gap-4 mb-8">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <span className="text-sm text-custom-text font-medium">Open to opportunities</span>
            </div>
            
            <blockquote className="border-l-2 border-custom-accent pl-6 italic text-custom-muted text-lg relative">
              <span className="text-4xl text-custom-border absolute -top-4 -left-3 font-serif">"</span>
              Simplicity is the soul of efficiency. The best systems are those that fade into the background, allowing the user's intent to flow effortlessly.
            </blockquote>
          </div>
          
        </div>
      </div>
    </div>
  );
}
