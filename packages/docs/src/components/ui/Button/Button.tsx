import React, { PropsWithChildren } from "react";
import "./Button.css";

type Props = {};

const Button = ({ children, ...props }: PropsWithChildren<Props>) => {
  return (
    <button className="clw-btn" {...props}>
      {children}
    </button>
  );
};

export default Button;
