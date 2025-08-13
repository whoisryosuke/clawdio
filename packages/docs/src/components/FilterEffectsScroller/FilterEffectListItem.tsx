import React, { ReactNode } from "react";
import Stack from "../ui/Stack/Stack";
import Heading from "../ui/Heading/Heading";
import Title from "../ui/Title/Title";
import Button from "../ui/Button/Button";

export type FilterEffectListItemProps = {
  signal: ReactNode;
  packageName: string;
  title: string;
  description: string;
  path?: number;
  url: string;
};

const FilterEffectListItem = ({
  signal,
  packageName,
  title,
  description,
  url,
}: FilterEffectListItemProps) => {
  return (
    <Stack
      horizontal
      responsive
      centered
      style={{
        maxWidth: "1200px",
        marginBottom: "4rem",
        alignSelf: "center",
      }}
    >
      <div className="ContentArea">
        <Stack className="FilterEffectsScroller_Box GlowStroke" centered>
          <div className="signal GlowStroke">{signal}</div>

          <Heading as="h4" mono style={{ color: "var(--gray-11)" }}>
            {packageName}
          </Heading>
        </Stack>
      </div>
      <div className="ContentArea">
        <Title as="h2">{title}</Title>
        <Heading as="h3" thin style={{ color: "var(--gray-11)" }}>
          {description}
        </Heading>
        <Stack horizontal>
          <Button as="a" href={url} ghost>
            Learn more
          </Button>
        </Stack>
      </div>
    </Stack>
  );
};

export default FilterEffectListItem;
