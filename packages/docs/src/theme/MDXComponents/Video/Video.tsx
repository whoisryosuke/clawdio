import React, { HTMLProps } from "react";
import "./Video.css";

type Props = HTMLProps<HTMLVideoElement> & {
  src: string;
};

const Video = ({ src, ...props }: Props) => {
  return (
    <div className="Video GlowStroke">
      <video width="100%" controls {...props}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
