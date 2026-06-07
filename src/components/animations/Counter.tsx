"use client";

import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/gsap";

type CounterProps = {
  value: number;
  suffix: string;
};

export function Counter({ value, suffix }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const { gsap } = getGsap();
    const state = { value: 0 };

    const tween = gsap.to(state, {
      value,
      duration: 1.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: node,
        start: "top 88%",
        once: true,
      },
      onUpdate: () => setDisplay(Math.round(state.value)),
    });

    return () => {
      tween.kill();
    };
  }, [value]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
