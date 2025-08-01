import React from "react";
import Title from "../ui/Title/Title";
import Heading from "../ui/Heading/Heading";
import Stack from "../ui/Stack/Stack";
import Button from "../ui/Button/Button";
import "./TryNowCTA.css";

type Props = {};

const TryNowCTA = (props: Props) => {
  return (
    <Stack className="TryNowCTA" centered>
      <div className="TryNowCTA_Container ContentArea">
        <Stack className="TryNowCTA_Box" centered>
          <Title as="h1">Let's get jammin'</Title>
          <Heading as="h2" style={{ color: "var(--gray-10)" }}>
            Three simple steps: install, import, and use!
          </Heading>
          <Button as="a" href="#">
            Browse the docs
          </Button>
        </Stack>
      </div>
    </Stack>
  );
};

export default TryNowCTA;
