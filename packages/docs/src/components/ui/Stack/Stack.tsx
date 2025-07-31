import React, { HTMLProps, PropsWithChildren } from "react";
import "./Stack.css";
import clsx from "clsx";

type Props = HTMLProps<HTMLDivElement> & {
  horizontal?: boolean;
  gap?: string;
  centered?: boolean;
};

const Stack = ({
  horizontal,
  centered,
  gap = "1rem",
  className,
  ...props
}: PropsWithChildren<Props>) => {
  const horizontalStyles = horizontal && "horizontal";
  const centeredStyles = centered && "centered";
  return (
    <div
      className={clsx("clw-stack", className, horizontalStyles, centeredStyles)}
      style={{
        "--gap": gap,
      }}
      {...props}
    />
  );
};

export default Stack;
