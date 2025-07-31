import React, { HTMLProps, PropsWithChildren } from "react";
import "./Heading.css";
import clsx from "clsx";

type Props = HTMLProps<HTMLHeadingElement> & {
  as: "h1" | "h2" | "h3" | "h4" | "h5";
  thin?: boolean;
  mono?: boolean;
};

const Heading = ({
  as: Component = "h1",
  children,
  thin,
  mono,
  className,
  ...props
}: PropsWithChildren<Props>) => {
  const thinStyles = thin && "thin";
  const monoStyles = mono && "mono";
  return (
    <Component
      className={clsx(
        "clw-heading",
        className,
        Component,
        thinStyles,
        monoStyles
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Heading;
