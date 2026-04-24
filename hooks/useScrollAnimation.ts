import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useScrollAnimation(
  animation: gsap.TweenVars,
  triggerOptions?: ScrollTrigger.Vars
) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
          ...triggerOptions,
        },
        ...animation,
      });
    });

    return () => ctx.revert();
  }, [animation, triggerOptions]);

  return ref;
}
