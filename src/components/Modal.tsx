import React, { HTMLAttributes } from "react";
import styled from "@emotion/styled";
import { theme } from "../utils";

interface IModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  overlay?: "dark" | "light" | "error";
  solid?: boolean;
}

const Overlay = styled("div")(({ overlay = "dark", open = false, solid = false }: IModalProps) => ({
  position: "fixed",
  inset: 0,
  width: "100vw",
  height: "100vh",
  background:
    overlay === "dark" ? theme.color["neutral-600"] : overlay === "light" ? theme.color["neutral-100"] : theme.color["moltres-200"],
  opacity: solid ? 1 : 0.9,
  zIndex: open ? 50 : 0,
}));

const Content = styled("div")(({ open = false }: IModalProps) => ({
  position: "fixed",
  inset: 0,
  width: "100vw",
  height: "100vh",
  zIndex: open ? 50 : 0,
  "> div": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
}));

const Modal = ({ children, open, overlay = "dark", solid }: IModalProps) => {
  return open ? (
    <>
      <Overlay open={open} overlay={overlay} solid={solid} />
      <Content open={open}>
        <div>{children}</div>
      </Content>
    </>
  ) : null;
};

export default Modal;
