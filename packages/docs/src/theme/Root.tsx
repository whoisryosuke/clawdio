import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

import { useLocation } from "@docusaurus/router";

function Root({ children }) {
  const lenis = useLenis();
  const location = useLocation();

  useEffect(() => {
    if (lenis) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        lenis.resize();
        lenis.scrollTo(0, { immediate: true });
      }, 100);
    }
  }, [location.pathname, lenis]);

  return <ReactLenis root>{children}</ReactLenis>;
}

export default Root;
