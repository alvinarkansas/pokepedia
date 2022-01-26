import { css } from "@emotion/react";

export const reset = css`
  :root {
    font-size: 18px;
  }

  * {
    font-family: "VT323", monospace;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  p,
  pre {
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  img,
  svg {
    display: block;
    vertical-align: middle;
  }

  a {
    text-decoration: none;
  }

  *,
  ::before,
  ::after {
    border-width: 0;
    border-style: solid;
    border-color: #132529;
  }
`;

export const global = css`
  .pxl-border {
    border-width: 4px;
    border-image-slice: 2;
    border-image-width: 2;
    border-image-repeat: stretch;
    border-image-source: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="5" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2 1 h1 v1 h-1 z M1 2 h1 v1 h-1 z M3 2 h1 v1 h-1 z M2 3 h1 v1 h-1 z" fill="rgb(33,37,41)" /></svg>');
    border-image-outset: 2;
    position: relative;
    display: inline-block;
    padding: 6px 8px;
    margin: 4px;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    color: #212529;
    background-color: #fff;
    cursor: pointer;
    text-transform: uppercase;
    flex-grow: 1;

    &:not(.no-inset)::after {
      position: absolute;
      top: -4px;
      right: -4px;
      bottom: -4px;
      left: -4px;
      content: "";
      box-shadow: inset -4px -4px #adafbc;
    }

    &:hover {
      color: #212529;
      text-decoration: none;
      background-color: #e7e7e7;
    }

    &:active:not(.is-disabled)::after {
      box-shadow: inset 4px 4px #adafbc;
    }
  }
`;
