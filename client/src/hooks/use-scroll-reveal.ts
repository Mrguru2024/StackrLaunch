import { useState, useEffect, useRef, RefObject } from 'react';

interface ScrollRevealOptions {
  threshold?: number;  // Percentage of element visible before triggering (0-1)
  delay?: number;      // Delay in ms before animation starts
  rootMargin?: string; // Margin around the root
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
): [RefObject<T>, boolean] {
  const { 
    threshold = 0.1,
    rootMargin = "0px",
    delay = 0 
  } = options;
  
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger once
        if (entry.isIntersecting && !isVisible) {
          // Add delay if specified
          if (delay) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }
        }
      },
      { 
        threshold, 
        rootMargin 
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, delay, isVisible]);

  return [ref, isVisible];
}

// Utility function to add staggered delays for multiple elements
export function createStaggeredDelays(
  baseDelay: number = 100, 
  count: number, 
  increment: number = 150
): number[] {
  return Array.from({ length: count }, (_, i) => baseDelay + (i * increment));
}