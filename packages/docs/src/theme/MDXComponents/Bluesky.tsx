import React, { PropsWithChildren } from "react";

type Props = {
  id: string;
};

const BlueskyEmbed = ({ id, children }: PropsWithChildren<Props>) => {
  return (
    // mb={6} display="flex" justifyContent="center"
    <div
      style={{
        display: "flex",
        marginBottom: "var(--space-5)",
        justifyContent: "center",
      }}
    >
      <blockquote
        className="bluesky-embed"
        data-bluesky-uri={`at://did:plc:itayxaatwwlwww4fp3jac3nn/app.bsky.feed.post/${id}`}
        data-bluesky-cid="bafyreiflt6p6c77vxtubpa4aev2qzilnkntxjbxx5x34x5yovs2afazyta"
        data-bluesky-embed-color-mode="system"
      >
        {children}
      </blockquote>
      <script
        async
        src="https://embed.bsky.app/static/embed.js"
        charSet="utf-8"
      />
    </div>
  );
};

export default BlueskyEmbed;
