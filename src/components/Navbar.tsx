import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

interface INavbarProps {
  children?: React.ReactNode;
  fadeHeight?: number;
  [x: string]: any;
}

const Navbar = React.forwardRef<HTMLDivElement, INavbarProps>(({ fadeHeight = 124, children }, ref) => {
  return (
    <nav
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        height: fadeHeight,
        background: "linear-gradient(180deg, #FDFDFD 0%, rgba(253, 253, 253, 0) 0.01%, rgba(253, 253, 253, 0.97) 30.37%, #FDFDFD 100%)",
      }}
      ref={ref}
    >
      <div
        style={{
          padding: 16,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {children}
        <div
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          <Link to="/" style={{ flexBasis: "50%", display: "flex" }}>
            <Button>Explore</Button>
          </Link>
          <Link to="/my-pokemon" style={{ flexBasis: "50%", display: "flex" }}>
            <Button>My Pokemon</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
