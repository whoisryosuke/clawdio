import React, { HTMLProps } from "react";

type Props = HTMLProps<HTMLVideoElement> & {
  src: string;
};

const Video = ({ src, ...props }: Props) => {
  return (
    <video width="100%" controls {...props}>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
