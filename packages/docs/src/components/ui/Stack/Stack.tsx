import React, { HTMLProps, PropsWithChildren } from "react";
import "./Stack.css";
import clsx from "clsx";

type Props = HTMLProps<HTMLDivElement> & {
  horizontal?: boolean;
  gap?: string;
  centered?: boolean;
  responsive?: boolean;
};

const Stack = ({
  horizontal,
  centered,
  responsive,
  gap = "1rem",
  className,
  ...props
}: PropsWithChildren<Props>) => {
  const horizontalStyles = horizontal && "horizontal";
  const centeredStyles = centered && "centered";
  const responsiveStyls = responsive && "responsive";
  return (
    <div
      className={clsx(
        "clw-stack",
        className,
        horizontalStyles,
        centeredStyles,
        responsiveStyls
      )}
      style={{
        "--gap": gap,
      }}
      {...props}
    />
  );
};

export default Stack;
