import React, { ButtonHTMLAttributes } from "react";
import styled from "@emotion/styled";
import { theme } from "../utils";

const StyledDeleteButton = styled("button")`
  padding: 4px;
  z-index: 1;
  cursor: pointer;
  &:hover {
    background-color: ${theme.color["neutral-200"]};
  }
  &:active::after {
    box-shadow: inset 4px 4px ${theme.color["neutral-300"]};
  }
`;

const DeleteButton = ({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledDeleteButton className="pxl-border" {...props}>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0H3V3H0V0ZM6 6H3V3H6V6ZM9 6H6V9H3V12H0V15H3V12H6V9H9V12H12V15H15V12H12V9H9V6ZM12 3V6H9V3H12ZM12 3V0H15V3H12Z"
          fill="#AF2A2A"
        />
      </svg>
    </StyledDeleteButton>
  );
};

export default DeleteButton;
