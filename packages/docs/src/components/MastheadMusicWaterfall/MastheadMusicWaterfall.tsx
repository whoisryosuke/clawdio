import useAudioStore from "@site/src/store/audio";
import React, { useEffect, useRef, useState } from "react";
import WaterfallViz from "./WaterfallViz";

type Props = {};

const MastheadMusicWaterfall = (props: Props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "90vh",
        display: "flex",
        position: "relative",
      }}
    >
      <WaterfallViz />
    </div>
  );
};

export default MastheadMusicWaterfall;
