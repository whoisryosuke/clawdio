import * as React from "react";

const TwitchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentcolor"
      d="M6 0 1.716 4.286v15.428h5.143V24l4.285-4.286h3.429L22.286 12V0zm14.572 11.143-3.429 3.428h-3.428l-3 3v-3H6.858V1.714h13.714z"
    ></path>
    <path
      fill="currentcolor"
      d="M18.001 4.714h-1.714v5.143h1.714zM13.287 4.714h-1.715v5.143h1.715z"
    ></path>
  </svg>
);

export default TwitchIcon;
