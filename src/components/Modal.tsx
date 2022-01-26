import React from "react";

interface IModalProps {
  open: boolean;
  overlay?: "dark" | "light" | "error";
  children: React.ReactNode;
}

const Modal = ({ children, open, overlay = "dark" }: IModalProps) => {
  return open ? (
    <>
      <div
        id="modal-overlay"
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          margin: "0 auto",
          background:
            overlay === "dark"
              ? "#132529"
              : overlay === "light"
              ? "#FFF"
              : "#AF2A2A",
          opacity: 0.9,
          zIndex: 50,
        }}
      />
      <div
        id="modal-content"
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          margin: "0 auto",
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          {children}
        </div>
      </div>
    </>
  ) : null;
};

export default Modal;
