import React from "react";
import FilterEffectListItem, {
  FilterEffectListItemProps,
} from "./FilterEffectListItem";
import { MotionValue } from "motion";
import { motion, useTransform } from "motion/react";

type Props = FilterEffectListItemProps & {
  scrollProgress: MotionValue<number>;
  total: number;
  index: number;
};

const FilterEffectListScrollItem = ({
  scrollProgress,
  total,
  index,
  path,
  ...props
}: Props) => {
  const increment = 1 / total;
  const halfIncrement = increment / 4;
  // Map from index/total to 0-1
  const segmentStart = index / total;
  const segmentMiddle = segmentStart + halfIncrement;
  const segmentMiddleHold = segmentStart + halfIncrement * 2;
  const segmentEnd = segmentStart + increment;

  const translateY = useTransform(
    scrollProgress,
    [segmentEnd, segmentMiddleHold, segmentMiddle, segmentStart],
    [-100, 0, 0, -100]
  );
  const opacity = useTransform(
    scrollProgress,
    [segmentEnd, segmentMiddleHold, segmentMiddle, segmentStart],
    [0, 1, 1, 0]
  );
  const pathAnimation = useTransform(
    scrollProgress,
    [segmentEnd, segmentMiddleHold, segmentMiddle, segmentStart],
    [path, 0, 0, path]
  );
  const depth = useTransform(
    scrollProgress,
    [segmentEnd, segmentMiddleHold, segmentMiddle, segmentStart],
    [-1, 420, 420, -1]
  );
  return (
    <motion.div
      className="FilterEffectListItem_Container"
      style={{ zIndex: depth }}
    >
      <motion.div
        style={{
          display: "flex",
          opacity,
          translateY,
          // @ts-expect-error it works, just not typed
          "--svg-path": pathAnimation,
        }}
      >
        <FilterEffectListItem {...props} />
      </motion.div>
    </motion.div>
  );
};

export default FilterEffectListScrollItem;
