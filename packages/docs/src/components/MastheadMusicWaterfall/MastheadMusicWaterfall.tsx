import useAudioStore from "@site/src/store/audio";
import React, { useEffect, useRef, useState } from "react";
import WaterfallViz from "./WaterfallViz";
import MastheadContent from "./MastheadContent";

type Props = {};

const MastheadMusicWaterfall = (props: Props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "90vh",
        position: "relative",
        marginTop: "-4rem",
      }}
    >
      <MastheadContent />
      <WaterfallViz />
    </div>
  );
};

export default MastheadMusicWaterfall;
