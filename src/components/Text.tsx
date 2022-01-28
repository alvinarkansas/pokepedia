import React, { HTMLAttributes } from "react";
import styled from "@emotion/styled";
import { theme, fontSize } from "../utils";

interface ITextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: "default" | "darker" | "outlined" | "error";
  size?: "base" | "lg" | "xl";
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4";
}

const getStyle = ({ variant = "default", size = "base", as = "p" }: ITextProps) => {
  switch (variant) {
    case "outlined":
      return {
        as,
        color: theme.color["neutral-100"],
        textShadow: theme.textShadow[`bold-${size}`],
        fontSize: fontSize[size],
      };
    case "darker":
      return {
        as,
        color: theme.color["neutral-500"],
        textShadow: theme.textShadow[`light-${size}`],
        fontSize: fontSize[size],
      };
    case "error":
      return {
        as,
        color: theme.color["moltres-200"],
        textShadow: theme.textShadow[`light-${size}`],
        fontSize: fontSize[size],
      };
    default:
      return {
        as,
        color: theme.color["neutral-400"],
        textShadow: theme.textShadow[`light-${size}`],
        fontSize: fontSize[size],
      };
  }
};

const PixelatedText = styled("p")((props: ITextProps) => getStyle(props));

const Text = ({ children, ...props }: ITextProps) => {
  return <PixelatedText {...props}>{children}</PixelatedText>;
};

export default Text;
