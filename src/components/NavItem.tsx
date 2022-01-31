import React, { ButtonHTMLAttributes } from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import styled from "@emotion/styled";
import Text from "./Text";
import { theme } from "../utils";

interface INavItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "zapdos" | "moltres" | "articuno";
  to: string;
  label: string;
}

interface IStyleProps {
  variant?: "zapdos" | "moltres" | "articuno";
  matched: boolean;
}

const getStyle = ({ variant = "articuno", matched }: IStyleProps) => {
  let style = {
    display: "flex",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  };
  switch (variant) {
    case "zapdos":
      return {
        ...style,
        background: matched ? theme.color["zapdos-100"] : theme.color[`${variant}-200`],
        "&:not(.no-inset)::after": {
          boxShadow: matched ? `inset 4px 4px ${theme.color["zapdos-300"]}` : `inset -4px -4px ${theme.color["zapdos-300"]}`,
        },
        "&:hover": {
          backgroundColor: theme.color["zapdos-100"],
        },
        "&:active::after": {
          boxShadow: `inset 4px 4px ${theme.color["zapdos-300"]}`,
        },
      };
    case "moltres":
      return {
        ...style,
        background: matched ? theme.color["moltres-100"] : theme.color[`${variant}-200`],
        "&:not(.no-inset)::after": {
          boxShadow: matched ? `inset 4px 4px ${theme.color["moltres-300"]}` : `inset -4px -4px ${theme.color["moltres-300"]}`,
        },
        "&:hover": {
          backgroundColor: theme.color["moltres-100"],
        },
        "&:active::after": {
          boxShadow: `inset 4px 4px ${theme.color["moltres-300"]}`,
        },
      };
    default:
      return {
        ...style,
        background: matched ? theme.color["articuno-100"] : theme.color[`${variant}-200`],
        "&:not(.no-inset)::after": {
          boxShadow: matched ? `inset 4px 4px ${theme.color["articuno-300"]}` : `inset -4px -4px ${theme.color["articuno-300"]}`,
        },
        "&:hover": {
          backgroundColor: theme.color["articuno-100"],
        },
        "&:active::after": {
          boxShadow: `inset 4px 4px ${theme.color["articuno-300"]}`,
        },
      };
  }
};

const PixelatedNavItem = styled("button")((props: IStyleProps) => getStyle(props));

const NavItem = ({ variant = "articuno", label, to }: INavItemProps) => {
  let resolved = useResolvedPath(to);
  let matched = useMatch({ path: resolved.pathname });

  return (
    <Link to={to} style={{ flexBasis: "50%", display: "flex" }}>
      <PixelatedNavItem className="pxl-border" variant={variant} matched={matched ? true : false}>
        <Text variant="outlined" size="lg">
          {label}
        </Text>
      </PixelatedNavItem>
    </Link>
  );
};

export default NavItem;
