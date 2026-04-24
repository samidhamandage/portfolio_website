"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface SplitTextProps {
  text: string;
  className?: string;
  charClassName?: string;
}

export function SplitText({
  text,
  className = "",
  charClassName = "hero-char inline-block",
}: SplitTextProps) {
  // A simple manual text splitter that splits by character
  // and preserves spaces.
  const chars = text.split("").map((char, index) => {
    if (char === " ") {
      return (
        <span key={index} className="inline-block whitespace-pre">
          {char}
        </span>
      );
    }
    return (
      <span
        key={index}
        className={charClassName}
        style={{ willChange: "transform, opacity" }}
      >
        {char}
      </span>
    );
  });

  return (
    <span className={className} aria-label={text} role="text">
      {chars}
    </span>
  );
}
