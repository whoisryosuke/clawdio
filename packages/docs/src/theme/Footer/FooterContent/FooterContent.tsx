import Stack from "@site/src/components/ui/Stack/Stack";
import React from "react";
import FooterLinks from "../FooterLinks/FooterLinks";
import FooterConnect from "../FooterConnect/FooterConnect";

type Props = {};

const FooterContent = (props: Props) => {
  return (
    <Stack horizontal gap="3rem" responsive>
      <FooterLinks />
      <FooterConnect />
    </Stack>
  );
};

export default FooterContent;
