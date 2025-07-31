import React from "react";
import "./styles/MastheadContent.css";
import ClawdioLogo from "../ClawdioLogo/ClawdioLogo";
import ButtonLink from "../ui/Button/ButtonLink";
import Stack from "../ui/Stack/Stack";

type Props = {};

const MastheadContent = (props: Props) => {
  return (
    <div className="MastheadContent_Container">
      <Stack className="MastheadContent_Content" centered>
        <ClawdioLogo className="MastheadContent_Logo" />
        <h2 className="MastheadContent_Title">
          An experimental project aimed to create modern effects for the Web
          Audio API using WASM and Rust.
        </h2>
        <Stack horizontal centered>
          <ButtonLink href="#">Getting Started</ButtonLink>
          <ButtonLink href="#" secondary>
            See Examples
          </ButtonLink>
        </Stack>
      </Stack>
    </div>
  );
};

export default MastheadContent;
