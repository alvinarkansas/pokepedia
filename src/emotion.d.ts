import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      "zapdos-100": string;
      "zapdos-200": string;
      "zapdos-300": string;
      "moltres-100": string;
      "moltres-200": string;
      "moltres-300": string;
      "articuno-100": string;
      "articuno-200": string;
      "articuno-300": string;
      "neutral-100": string;
      "neutral-200": string;
      "neutral-300": string;
      "neutral-400": string;
      "neutral-500": string;
    };
    fontSize: {
      base: string;
      lg: string;
      xl: string;
    };
    textShadow: {
      base: string[];
      lg: string[];
      xl: string[];
    };
  }
}
