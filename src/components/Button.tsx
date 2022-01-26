import React from "react";

const Button = ({ children, ...props }: any) => {
  return (
    <button
      className="pxl-border"
      style={{
        display: "flex",
        gap: 8,
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.5rem",
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
