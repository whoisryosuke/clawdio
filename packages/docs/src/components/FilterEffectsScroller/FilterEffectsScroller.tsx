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

const EFFECTS: FilterEffectListItemProps[] = [
  {
    signal: <BitcrusherSignal />,
    title: "Bitcrusher",
    packageName: "clawdio-bitcrusher",
    description: `Bitcrusher creates a crunchy "8-bit" sound by lowering the
            resolution of the signal.`,
  },
  {
    signal: <PinkNoiseSignal />,
    title: "Pink Noise",
    packageName: "clawdio-pink-noise",
    description: `Bitcrusher creates a crunchy "8-bit" sound by lowering the
            resolution of the signal.`,
  },
  {
    signal: <MoogSignal />,
    title: "Moog Filter",
    packageName: "clawdio-moog",
    description: `Bitcrusher creates a crunchy "8-bit" sound by lowering the
            resolution of the signal.`,
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
    </div>
  );
};

export default FilterEffectsScroller;
