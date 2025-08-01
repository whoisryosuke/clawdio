import React, { useRef } from "react";
import Heading from "../ui/Heading/Heading";
import BitcrusherSignal from "../signals/BitcrusherSignal";
import Stack from "../ui/Stack/Stack";
import Title from "../ui/Title/Title";
import "./FilterEffectsScroller.css";
import { useScroll, useTransform } from "motion/react";
import FilterEffectListItem, {
  FilterEffectListItemProps,
} from "./FilterEffectListItem";
import PinkNoiseSignal from "../signals/PinkNoiseSignal";
import FilterEffectListScrollItem from "./FilterEffectListScrollItem";
import MoogSignal from "../signals/MoogSignal";
import FilterEffectsVisual from "./FilterEffectsVisual";

const EFFECTS: FilterEffectListItemProps[] = [
  {
    signal: <BitcrusherSignal />,
    title: "Bitcrusher",
    packageName: "clawdio-bitcrusher",
    description: `Bitcrusher creates a crunchy "8-bit" sound by lowering the
            resolution of the signal.`,
    path: 1000,
  },
  {
    signal: <PinkNoiseSignal />,
    title: "Pink Noise",
    packageName: "clawdio-pink-noise",
    description: `Pink noise sounds like waves on a beach, a waterfall, or a gentle “whoosh” sound. It’s a common sound signature that’s found in nature.`,
    path: 4000,
  },
  {
    signal: <MoogSignal />,
    title: "Moog Filter",
    packageName: "clawdio-moog",
    description: `Named after the “ladder” filter in Moog synthesizers, it mimics the voltage control to create a warm, thick sound.`,
    path: 700,
  },
];

type Props = {};

const FilterEffectsScroller = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,

    offset: ["end end", "start start"],
  });
  return (
    <div
      ref={containerRef}
      className="FilterEffectsScroller_Container"
      style={{ "--count": EFFECTS.length }}
    >
      <div className="FilterEffectsScroller_Content">
        {EFFECTS.map((effect, index) => (
          <FilterEffectListScrollItem
            scrollProgress={scrollYProgress}
            total={EFFECTS.length}
            index={index}
            {...effect}
          />
        ))}
      </div>
      <FilterEffectsVisual scrollProgress={scrollYProgress} />
    </div>
  );
};

export default FilterEffectsScroller;
