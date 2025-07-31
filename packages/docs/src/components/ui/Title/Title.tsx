import React, { HTMLProps, PropsWithChildren } from "react";
import "./Title.css";
import clsx from "clsx";

type Props = HTMLProps<HTMLHeadingElement> & {
  as: "h1" | "h2" | "h3";
};

const Title = ({
  as: Component = "h1",
  children,
  className,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <Component className={clsx("clw-title", className, Component)} {...props}>
      {children}
    </Component>
  );
};

export default Title;
