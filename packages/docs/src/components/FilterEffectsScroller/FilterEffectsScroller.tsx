import React from "react";
import Heading from "../ui/Heading/Heading";
import BitcrusherSignal from "../signals/BitcrusherSignal";
import Stack from "../ui/Stack/Stack";
import Title from "../ui/Title/Title";
import "./FilterEffectsScroller.css";

type Props = {};

const FilterEffectsScroller = (props: Props) => {
  return (
    <Stack
      horizontal
      responsive
      centered
      style={{ maxWidth: "1200px", marginBottom: "4rem", alignSelf: "center" }}
    >
      <div className="ContentArea">
        <Stack className="FilterEffectsScroller_Box GlowStroke" centered>
          <div className="signal GlowStroke">
            <BitcrusherSignal />
          </div>

          <Heading as="h4" mono style={{ color: "var(--gray-11)" }}>
            clawdio-bitcrusher
          </Heading>
        </Stack>
      </div>
      <div className="ContentArea">
        <Title as="h2">Bitcrusher</Title>
        <Heading as="h3" thin style={{ color: "var(--gray-11)" }}>
          Bitcrusher creates a crunchy "8-bit" sound by lowering the resolution
          of the signal.
        </Heading>
      </div>
    </Stack>
  );
};

export default FilterEffectsScroller;
