"use client";

import { useEffect, useState } from "react";

type Pointer = {
  x: number;
  y: number;
};

export function useMouseParallax(strength = 18) {
  const [pointer, setPointer] = useState<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * strength;
      const y = (event.clientY / window.innerHeight - 0.5) * strength;
      setPointer({ x, y });
    };

    window.addEventListener("pointermove", handleMove);

    return () => window.removeEventListener("pointermove", handleMove);
  }, [strength]);

  return pointer;
}
