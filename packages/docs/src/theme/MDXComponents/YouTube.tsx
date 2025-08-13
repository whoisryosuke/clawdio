import React, { PropsWithChildren } from "react";

type Props = {
  id: string;
  title: string;
};

const YouTubeEmbed = ({ id, title, children }: PropsWithChildren<Props>) => {
  return (
    // mb={6} display="flex" justifyContent="center"
    <div
      style={{
        display: "flex",
        marginBottom: "var(--space-5)",
        justifyContent: "center",
      }}
    >
      <iframe
        width="680"
        height="1209"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
