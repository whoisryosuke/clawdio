import { ThemeConfig } from "@docusaurus/types";
import Heading from "@site/src/components/ui/Heading/Heading";
import Stack from "@site/src/components/ui/Stack/Stack";
import React from "react";

type Props = {
  column: {
    title: string;
    items: { label: string; to?: string; href?: string }[];
  };
};

const FooterLinkItem = ({ column }: Props) => {
  return (
    <Stack gap="var(--space-0-5)">
      <Heading as="h4" style={{ marginBottom: "var(--space-0-5)" }}>
        {column.title}
      </Heading>
      {column.items.map((item) => (
        <a key={item.label} href={item.to ?? item.href}>
          {item.label}
        </a>
      ))}
    </Stack>
  );
};

export default FooterLinkItem;
