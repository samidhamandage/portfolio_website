"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".footer-link", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        },
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        duration: 0.8,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="border-t border-custom-border py-12 bg-custom-bg mt-24">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="footer-link text-custom-muted text-sm">
          John Doe &copy; {new Date().getFullYear()} &middot; Built with Next.js + GSAP
        </div>
        <div className="flex gap-6">
          <Link href="https://github.com" className="footer-link text-custom-muted hover:text-custom-highlight transition-colors text-sm">
            GitHub
          </Link>
          <Link href="https://linkedin.com" className="footer-link text-custom-muted hover:text-custom-highlight transition-colors text-sm">
            LinkedIn
          </Link>
          <Link href="mailto:hello@example.com" className="footer-link text-custom-muted hover:text-custom-highlight transition-colors text-sm">
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
