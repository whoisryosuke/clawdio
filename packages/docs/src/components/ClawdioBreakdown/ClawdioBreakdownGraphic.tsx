import React from "react";
import SineWave from "../SineWave/SineWave";
import SineWaveEffected from "../SineWave/SineWaveEffected";
import "./ClawdioBreakdown.css";
import Title from "../ui/Title/Title";
import Heading from "../ui/Heading/Heading";
import Stack from "../ui/Stack/Stack";

const Subheader = ({ children }) => (
  <Heading as="h3" thin style={{ color: "var(--gray-8)" }}>
    {children}
  </Heading>
);

type Props = {};

const ClawdioBreakdownGraphic = (props: Props) => {
  return (
    <Stack className="ClawdioBreakdownGraphic_Container" horizontal>
      <div>
        <Title as="h3">Your Audio</Title>
        <SineWave className="ClawdioBreakdownGraphic_Wave_Left" />
        <Subheader>Main CPU Thread</Subheader>
      </div>
      <div>
        <div className="ClawdioBreakdownGraphic_Box">
          <Title as="h3">AudioWorkletNode</Title>
          <Stack horizontal>
            <Heading as="h3" thin>
              Rust
            </Heading>
            <Heading as="h3" thin>
              WASM
            </Heading>
          </Stack>
        </div>

        <Subheader>Separate CPU Thread</Subheader>
      </div>
      <div>
        <Title as="h3">Audio + Effects</Title>
        <SineWaveEffected className="ClawdioBreakdownGraphic_Wave_Right" />

        <Subheader>Main CPU Thread</Subheader>
      </div>
    </Stack>
  );
};

export default ClawdioBreakdownGraphic;
