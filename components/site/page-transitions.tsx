"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Small progressive enhancement for client-side Next.js route transitions.
 * Only animate the page content, so the header, menus and footer stay steady.
 * Hash changes and product filters (same pathname) do not reanimate.
 */
export function PageTransitions() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Respect reduced-motion preferences and support older browsers.
    if (
      !("animate" in Element.prototype) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const main = document.getElementById("main");
    if (!main) return;

    const animation = main.animate(
      [
        { opacity: 0.7, transform: "translate3d(0, 10px, 0)" },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
      ],
      {
        duration: 270,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "none",
      },
    );

    return () => animation.cancel();
  }, [pathname]);

  return null;
}
