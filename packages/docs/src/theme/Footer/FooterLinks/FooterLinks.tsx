import { useThemeConfig } from "@docusaurus/theme-common";
import Heading from "@site/src/components/ui/Heading/Heading";
import Stack from "@site/src/components/ui/Stack/Stack";
import React from "react";
import FooterLinkItem from "./FooterLinkItem";

type Props = {};

const FooterLinks = (props: Props) => {
  const { footer } = useThemeConfig();
  if (!footer) {
    return null;
  }
  const { copyright, links, logo, style } = footer;

  console.log("links", links);

  return (
    <Stack horizontal gap="3em">
      {links.map((column) => (
        <FooterLinkItem column={column} />
      ))}
    </Stack>
  );
};

export default FooterLinks;
