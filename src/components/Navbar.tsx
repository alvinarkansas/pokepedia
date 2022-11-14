import React from "react";
import styled from "@emotion/styled";
import NavItem from "./NavItem";
import { spacing } from "../utils";

interface INavbarProps {
  children?: React.ReactNode;
  fadeHeight?: number;
  visible?: boolean;
  [other: string]: any;
}

const GradientBakcdrop = styled("div")((props: { visible?: boolean, height?: number }) => ({
  position: "fixed",
  zIndex: 1,
  left: 0,
  right: 0,
  height: props.height,
  bottom: props.visible ? 0 : "-100%",
  transition: "300ms",
  background: "linear-gradient(180deg, #FDFDFD 0%, rgba(253, 253, 253, 0) 0.01%, rgba(253, 253, 253, 0.97) 30.37%, #FDFDFD 100%)",
}));

const OuterNav = styled("nav")((props: { visible?: boolean }) => ({
  padding: spacing.base,
  position: "absolute",
  left: 0,
  right: 0,
  bottom: props.visible ? 0 : "-100%",
  display: "flex",
  flexDirection: "column",
  gap: spacing.base,
  transition: "300ms",
  margin: "0 auto",
  "@media (min-width: 640px)": {
    width: "80vh",
  },
}));

const InnerNav = styled("div")({
  display: "flex",
  gap: spacing.base,
});

const Navbar = React.forwardRef<HTMLDivElement, INavbarProps>(({ fadeHeight = 124, visible= true, children }, ref) => {
  return (
    <GradientBakcdrop
      height={fadeHeight}
      visible={visible}
      ref={ref}
    >
      <OuterNav visible={visible}>
        {children}
        <InnerNav>
          <NavItem to="/" label="Explore" />
          <NavItem to="/my-pokemon" label="My Pokemon" variant="zapdos" />
        </InnerNav>
      </OuterNav>
    </GradientBakcdrop>
  );
});

export default Navbar;
