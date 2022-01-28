import React, { InputHTMLAttributes } from "react";
import styled from "@emotion/styled";
import { fontSize, theme } from "../utils";

const PixelatedInput = styled("div")({
  input: {
    fontSize: fontSize.lg,
    textAlign: "center",
    width: "100%",
    textTransform: "uppercase",
    "::placeholder": {
      color: theme.color["neutral-200"],
    },
  },
});

const Input = ({ placeholder, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <PixelatedInput className="pxl-border no-inset">
      <input required placeholder={placeholder} {...props} />
    </PixelatedInput>
  );
};

export default Input;
