import React from "react";
import { ReactLenis } from "lenis/react";

function Root({ children }) {
  return <ReactLenis root>{children}</ReactLenis>;
}

export default Root;
