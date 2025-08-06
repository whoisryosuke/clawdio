import Heading from "@site/src/components/ui/Heading/Heading";
import Stack from "@site/src/components/ui/Stack/Stack";
import React from "react";
import FooterSocialLinks from "./FooterSocialLinks";

type Props = {};

const FooterConnect = (props: Props) => {
  return (
    <Stack>
      <Heading as="h4" style={{ marginBottom: "var(--space-0-5)" }}>
        Connect
      </Heading>
      <FooterSocialLinks />
    </Stack>
  );
};

export default FooterConnect;
