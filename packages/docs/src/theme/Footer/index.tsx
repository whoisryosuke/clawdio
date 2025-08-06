import React, { type ReactNode } from "react";

import { useThemeConfig } from "@docusaurus/theme-common";
import FooterLinks from "@theme/Footer/Links";
import FooterLogo from "@theme/Footer/Logo";
import FooterCopyright from "@theme/Footer/Copyright";
import FooterLayout from "@theme/Footer/Layout";
import Stack from "@site/src/components/ui/Stack/Stack";
import FooterLogoCopyright from "./FooterLogoCopyright/FooterLogoCopyright";
import "./Footer.css";
import FooterContent from "./FooterContent/FooterContent";

function Footer(): ReactNode {
  const { footer } = useThemeConfig();
  if (!footer) {
    return null;
  }
  const { copyright, links, logo, style } = footer;

  return (
    <Stack className="Footer GlowStroke" horizontal responsive>
      <FooterLogoCopyright />
      <FooterContent />
    </Stack>
  );
}

export default React.memo(Footer);
