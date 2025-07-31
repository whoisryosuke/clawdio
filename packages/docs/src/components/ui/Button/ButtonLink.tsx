import React, { HTMLProps, PropsWithChildren } from "react";
import "./Button.css";
import clsx from "clsx";

type Props = HTMLProps<HTMLAnchorElement> & {
  ghost?: boolean;
  secondary?: boolean;
};

const ButtonLink = ({
  ghost,
  secondary,
  children,
  className,
  ...props
}: PropsWithChildren<Props>) => {
  const ghostStyles = ghost && "ghost";
  const secondaryStyles = secondary && "secondary";
  return (
    <a
      className={clsx("clw-btn", className, ghostStyles, secondaryStyles)}
      {...props}
    >
      {children}
    </a>
  );
};

export default ButtonLink;
