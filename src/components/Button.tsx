import React from "react";

const Button = ({ children, ...props }: any) => {
  return (
    <div
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
    </div>
  );
};

export default Button;
