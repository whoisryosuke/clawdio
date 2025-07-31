import React from "react";
import "./styles/MastheadContent.css";
import ClawdioLogo from "../ClawdioLogo/ClawdioLogo";
import Button from "../ui/Button/Button";
import Stack from "../ui/Stack/Stack";

type Props = {};

const MastheadContent = (props: Props) => {
  return (
    <div className="MastheadContent_Container ContentArea">
      <Stack className="MastheadContent_Content" centered>
        <ClawdioLogo className="MastheadContent_Logo" />
        <h2 className="MastheadContent_Title">
          An experimental project aimed to create modern effects for the Web
          Audio API using WASM and Rust.
        </h2>
        <Stack horizontal centered responsive>
          <Button as="a" href="#">
            Getting Started
          </Button>
          <Button as="a" href="#" secondary>
            See Examples
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default MastheadContent;
