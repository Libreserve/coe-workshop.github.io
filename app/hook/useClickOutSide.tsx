"use client";

import { useState, useEffect, useRef } from "react";
export const useClickOutSide = () => {
  const [isOpen, setIsopen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClick = (event: Event) => {
      const target = event.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        setIsopen(false);
      }
    };

    document.addEventListener("pointerdown", handleClick);
    return () => document.removeEventListener("pointerdown", handleClick);
  }, [isOpen]);
  return { ref, isOpen, setIsopen };
};
