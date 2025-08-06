import ClawdioLogo from "@site/src/components/ClawdioLogo/ClawdioLogo";
import Stack from "@site/src/components/ui/Stack/Stack";
import React from "react";
import "./FooterLogoCopyright.css";

type Props = {};

const FooterLogoCopyright = (props: Props) => {
  return (
    <Stack className="FooterLogoCopyright">
      <ClawdioLogo className="logo" width="150px" height="auto" />
      <p className="description">
        Web Audio effects library using Rust and WASM{" "}
      </p>
      <p className="copyright">Created with 🦀 by Ryosuke Hana</p>
    </Stack>
  );
};

export default FooterLogoCopyright;
