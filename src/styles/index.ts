import { css } from "@emotion/react";

export const global = css`
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

  a { text-decoration: none; }

  *,
  ::before,
  ::after {
    border-width: 0;
    border-style: solid;
    border-color: #132529;
  }
`;
