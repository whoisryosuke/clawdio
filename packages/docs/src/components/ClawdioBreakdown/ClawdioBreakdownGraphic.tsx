import React from "react";
import SineWave from "../SineWave/SineWave";
import SineWaveEffected from "../SineWave/SineWaveEffected";
import "./ClawdioBreakdown.css";
import Title from "../ui/Title/Title";
import Heading from "../ui/Heading/Heading";
import Stack from "../ui/Stack/Stack";
import {
  BiCog,
  BiExtension,
  BiFile,
  BiFileBlank,
  BiRightArrowAlt,
} from "react-icons/bi";

const Subheader = ({ children }) => (
  <Heading as="h3" thin style={{ color: "var(--gray-8)" }}>
    {children}
  </Heading>
);

type Props = {};

const ClawdioBreakdownGraphic = (props: Props) => {
  return (
    <Stack className="ClawdioBreakdownGraphic_Container">
      <Stack className="SignalContainer">
        <Stack>
          <Title as="h3">Your Audio</Title>
          <SineWave
            className="ClawdioBreakdownGraphic_Wave_Left"
            width="100%"
          />
        </Stack>
        <Subheader>Main CPU Thread</Subheader>
      </Stack>
      <div>
        <div className="ClawdioBreakdownGraphic_Box">
          <Title as="h3">AudioWorkletNode</Title>
          <Stack horizontal style={{ alignItems: "center" }}>
            <Stack centered gap="0.25rem">
              <BiFileBlank className="icon" color="var(--clawdio-1100)" />
              <Heading as="h3" thin>
                Rust
              </Heading>
            </Stack>
            <BiRightArrowAlt className="icon" color="var(--gray-8)" />
            <BiCog className="icon" color="var(--gray-11)" />
            <BiRightArrowAlt className="icon" color="var(--gray-8)" />
            <Stack centered gap="0.25rem">
              <BiExtension className="icon" color="var(--violet-8)" />
              <Heading as="h3" thin>
                WASM
              </Heading>
            </Stack>
          </Stack>
        </div>

        <Subheader>Separate CPU Thread</Subheader>
      </div>
      <Stack className="SignalContainer">
        <Stack>
          <Title as="h3">Audio + Effects</Title>
          <SineWaveEffected
            className="ClawdioBreakdownGraphic_Wave_Right"
            width="100%"
          />
        </Stack>

        <Subheader>Main CPU Thread</Subheader>
      </Stack>
    </Stack>
  );
};

export default ClawdioBreakdownGraphic;
