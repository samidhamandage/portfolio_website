"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";

const galleryItems = [
  { id: 1, src: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop", title: "Hackathon Winner", year: "2023", desc: "First place at Global Tech Hackathon for AI innovation.", aspect: "aspect-[4/3]" },
  { id: 2, src: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop", title: "Tech Conference", year: "2024", desc: "Keynote speaker on scalable architectures.", aspect: "aspect-[3/4]" },
  { id: 3, src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop", title: "AWS Certification", year: "2022", desc: "Solutions Architect Professional.", aspect: "aspect-square" },
  { id: 4, src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop", title: "Open Source Summit", year: "2023", desc: "Panel discussion on React ecosystems.", aspect: "aspect-[3/4]" },
  { id: 5, src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop", title: "Team Offsite", year: "2024", desc: "Engineering team building in Colorado.", aspect: "aspect-video" },
  { id: 6, src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop", title: "Office Setup", year: "2024", desc: "Where the magic happens.", aspect: "aspect-square" },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxImgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [activeImg, setActiveImg] = useState<(typeof galleryItems)[0] | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Grid items stagger in
      if (gridRef.current) {
        const items = gsap.utils.toArray(".gallery-item");
        gsap.from(items, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          stagger: 0.08,
          ease: "back.out(1.2)",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Lightbox animation
  useEffect(() => {
    if (!lightboxRef.current || !overlayRef.current || !lightboxImgRef.current) return;

    if (activeImg) {
      document.documentElement.classList.add("lenis-stopped"); // Stop smooth scroll
      
      const tl = gsap.timeline();
      tl.to(lightboxRef.current, { autoAlpha: 1, duration: 0.1 })
        .to(overlayRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" })
        .fromTo(lightboxImgRef.current, 
          { scale: 0.3, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "expo.out" },
          "-=0.2"
        );
    } else {
      document.documentElement.classList.remove("lenis-stopped");
      
      const tl = gsap.timeline();
      tl.to(lightboxImgRef.current, { scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in" })
        .to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.2")
        .set(lightboxRef.current, { autoAlpha: 0 });
    }
  }, [activeImg]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImg(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleHover = (e: React.MouseEvent<HTMLDivElement>, enter: boolean) => {
    const target = e.currentTarget;
    const overlay = target.querySelector(".caption-overlay");
    const caption = target.querySelector(".caption-text");
    
    if (enter) {
      gsap.to(overlay, { opacity: 1, duration: 0.3 });
      gsap.fromTo(caption, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 0.4, ease: "power2.out" });
    } else {
      gsap.to(overlay, { opacity: 0, duration: 0.3 });
      gsap.to(caption, { clipPath: "inset(100% 0 0 0)", duration: 0.3 });
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-custom-bg" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold font-heading text-custom-text mb-16 tracking-tight">
          Moments & Milestones
        </h1>

        {/* CSS Multi-column Masonry */}
        <div ref={gridRef} className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item) => (
            <div 
              key={item.id}
              className="gallery-item relative w-full break-inside-avoid rounded-2xl overflow-hidden cursor-pointer bg-custom-surface border border-custom-border"
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
              onClick={() => setActiveImg(item)}
            >
              <div className={`relative w-full ${item.aspect}`}>
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Hover Caption */}
              <div className="caption-overlay absolute inset-0 bg-custom-bg/80 backdrop-blur-sm opacity-0 flex flex-col justify-end p-6">
                <div className="caption-text flex flex-col" style={{ clipPath: "inset(100% 0 0 0)" }}>
                  <span className="text-custom-accent text-sm font-semibold mb-1">{item.year}</span>
                  <h3 className="text-xl font-bold text-custom-text mb-2 font-heading">{item.title}</h3>
                  <p className="text-custom-muted text-sm">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <div 
        ref={lightboxRef}
        className="fixed inset-0 z-[100] flex items-center justify-center invisible"
      >
        <div 
          ref={overlayRef} 
          className="absolute inset-0 bg-black/95 opacity-0 cursor-pointer"
          onClick={() => setActiveImg(null)}
        />
        
        <button 
          className="absolute top-6 right-6 z-10 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
          onClick={() => setActiveImg(null)}
        >
          <X size={24} />
        </button>

        <div className="relative w-full max-w-5xl max-h-[85vh] p-4 pointer-events-none flex items-center justify-center">
          {activeImg && (
            <img 
              ref={lightboxImgRef}
              src={activeImg.src} 
              alt={activeImg.title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl pointer-events-auto"
            />
          )}
        </div>
        
        {activeImg && (
          <div className="absolute bottom-8 left-0 right-0 text-center z-10 pointer-events-none">
            <h3 className="text-2xl font-heading font-bold text-white mb-2">{activeImg.title}</h3>
            <p className="text-white/70">{activeImg.desc}</p>
          </div>
        )}
      </div>
    </div>
  );
}
