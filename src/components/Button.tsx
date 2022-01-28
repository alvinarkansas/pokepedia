import styled from "@emotion/styled";
import React, { ButtonHTMLAttributes } from "react";
import Text from "./Text";
import { theme } from "../utils";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "zapdos" | "moltres" | "articuno";
  size?: "lg" | "xl";
  icon?: string;
}

const getStyle = ({ variant = "articuno" }: IButtonProps) => {
  let style = {
    display: "flex",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  };
  switch (variant) {
    case "zapdos":
      return {
        ...style,
        background: theme.color[`${variant}-200`],
        "&:not(.no-inset)::after": {
          boxShadow: `inset -4px -4px ${theme.color["zapdos-300"]}`,
        },
        "&:hover": {
          backgroundColor: theme.color["zapdos-100"],
        },
        "&:active:not(.is-disabled)::after": {
          boxShadow: `inset 4px 4px ${theme.color["zapdos-300"]}`,
        },
      };
    case "moltres":
      return {
        ...style,
        background: theme.color[`${variant}-200`],
        "&:not(.no-inset)::after": {
          boxShadow: `inset -4px -4px ${theme.color["moltres-300"]}`,
        },
        "&:hover": {
          backgroundColor: theme.color["moltres-100"],
        },
        "&:active:not(.is-disabled)::after": {
          boxShadow: `inset 4px 4px ${theme.color["moltres-300"]}`,
        },
      };
    default:
      return {
        ...style,
        background: theme.color[`${variant}-200`],
        "&:not(.no-inset)::after": {
          boxShadow: `inset -4px -4px ${theme.color["articuno-300"]}`,
        },
        "&:hover": {
          backgroundColor: theme.color["articuno-100"],
        },
        "&:active:not(.is-disabled)::after": {
          boxShadow: `inset 4px 4px ${theme.color["articuno-300"]}`,
        },
      };
  }
};

const PixelatedButton = styled("button")((props: IButtonProps) => getStyle(props));

const Button = ({ children, size = "lg", icon, ...props }: IButtonProps) => {
  return (
    <PixelatedButton className="pxl-border" {...props}>
      {icon && <img src={icon} alt="button icon" width={size === "xl" ? 40 : 20} height={size === "xl" ? 40 : 20} />}
      <Text variant="outlined" size={size}>
        {children}
      </Text>
    </PixelatedButton>
  );
};

export default Button;
