import React, { useRef } from "react";
import Heading from "../ui/Heading/Heading";
import BitcrusherSignal from "../signals/BitcrusherSignal";
import Stack from "../ui/Stack/Stack";
import Title from "../ui/Title/Title";
import "./FilterEffectsScroller.css";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import FilterEffectListItem, {
  FilterEffectListItemProps,
} from "./FilterEffectListItem";
import PinkNoiseSignal from "../signals/PinkNoiseSignal";
import FilterEffectListScrollItem from "./FilterEffectListScrollItem";
import MoogSignal from "../signals/MoogSignal";
import FilterEffectsVisual from "./FilterEffectsVisual";

const EFFECTS: FilterEffectListItemProps[] = [
  {
    signal: <MoogSignal />,
    title: "Moog Filter",
    packageName: "clawdio-moog",
    description: `Named after the “ladder” filter in Moog synthesizers, it mimics the voltage control to create a warm, thick sound.`,
    path: 700,
    url: "clawdio/docs/effects/moog",
  },
  {
    signal: <PinkNoiseSignal />,
    title: "Pink Noise",
    packageName: "clawdio-pink-noise",
    description: `Pink noise sounds like waves on a beach, a waterfall, or a gentle “whoosh” sound. It’s a common sound signature that’s found in nature.`,
    path: 4000,
    url: "clawdio/docs/effects/pink-noise",
  },
  {
    signal: <BitcrusherSignal />,
    title: "Bitcrusher",
    packageName: "clawdio-bitcrusher",
    description: `Bitcrusher creates a crunchy "8-bit" sound by lowering the
            resolution of the signal.`,
    path: 1000,
    url: "clawdio/docs/effects/bitcrusher",
  },
];

type Props = {};

const FilterEffectsScroller = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,

    offset: ["1 0.6", "start start"],
  });
  // const opacity = useTransform(scrollYProgress, [0, 1, 1, 0], [0, 1, 1, 0]);
  const depth = useTransform(scrollYProgress, [0, 1, 1, 0], [-1, 710, 710, -1]);
  const display = useTransform(
    scrollYProgress,
    [0, 1, 1, 0],
    ["none", "fixed", "fixed", "none"]
  );
  const containerDisplay = useTransform(
    scrollYProgress,
    [0, 0.05, 0.1],
    ["-100%", "0%", "0%"]
  );
  const containerOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.1],
    [0, 0, 1]
  );
  return (
    <div
      ref={containerRef}
      className="FilterEffectsScroller_Container"
      style={{ "--count": EFFECTS.length }}
    >
      <motion.div
        className="FilterEffectsScroller_Content"
        style={{ y: containerDisplay, opacity: containerOpacity }}
      >
        {EFFECTS.map((effect, index) => (
          <FilterEffectListScrollItem
            scrollProgress={scrollYProgress}
            total={EFFECTS.length}
            index={index}
            {...effect}
          />
        ))}
      </motion.div>
      <FilterEffectsVisual scrollProgress={scrollYProgress} />
      <motion.div
        className="FilterEffectsScroller_Gradient top"
        style={{ display, zIndex: depth }}
      />
      <motion.div
        className="FilterEffectsScroller_Gradient bottom"
        style={{ display, zIndex: depth }}
      />
    </div>
  );
};

export default FilterEffectsScroller;
