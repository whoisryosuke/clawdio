import React from "react";
import Heading from "../ui/Heading/Heading";
import "./ClawdioBreakdown.css";
import Stack from "../ui/Stack/Stack";
import Title from "../ui/Title/Title";
import ClawdioBreakdownGraphic from "./ClawdioBreakdownGraphic";

type Props = {};

const ClawdioBreakdown = (props: Props) => {
  return (
    <Stack
      className="ClawdioBreakdown_Container"
      centered
      gap="2rem"
      style={{ padding: "5rem 0 20rem 0" }}
    >
      <Stack gap="0.25rem" style={{ maxWidth: "800px", marginBottom: "4rem" }}>
        <Title as="h1">What is clawdio?</Title>
        <Heading as="h3" thin style={{ color: "var(--gray-11)" }}>
          We leverage the Audio Worklet API to offload audio processing to a
          separate thread, then use WebAssembly (WASM) to process the audio even
          faster using Rust.
        </Heading>
      </Stack>
      <ClawdioBreakdownGraphic />
    </Stack>
  );
};

export default ClawdioBreakdown;
