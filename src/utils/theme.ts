import { shadowSpacing } from "./units";

const color = {
  "zapdos-100": "#FCC659",
  "zapdos-200": "#E59D0A",
  "zapdos-300": "#C38506",
  "moltres-100": "#FF0000",
  "moltres-200": "#AF2A2A",
  "moltres-300": "#810A0A",
  "articuno-100": "#5DB6D8",
  "articuno-200": "#2E6C9A",
  "articuno-300": "#275272",
  "neutral-100": "#FDFDFD",
  "neutral-200": "#EDE8F8",
  "neutral-300": "#DCD4EB",
  "neutral-400": "#79797B",
  "neutral-500": "#545358",
  "neutral-600": "#132529",
};

const textShadow = {
  "light-base": `${shadowSpacing.base[2]} ${shadowSpacing.base[2]} 0 ${color["neutral-300"]}`,
  "light-lg": `${shadowSpacing.lg[1]} ${shadowSpacing.lg[1]} 0 ${color["neutral-300"]}`,
  "light-xl": `${shadowSpacing.xl[1]} ${shadowSpacing.xl[1]} 0 ${color["neutral-300"]}`,
  "bold-base": `-${shadowSpacing.base[1]} -${shadowSpacing.base[1]} 0 ${color["neutral-600"]},
    ${shadowSpacing.base[1]} -${shadowSpacing.base[1]} 0 ${color["neutral-600"]},
    -${shadowSpacing.base[1]} ${shadowSpacing.base[1]} 0 ${color["neutral-600"]},
    ${shadowSpacing.base[1]} ${shadowSpacing.base[1]} 0 ${color["neutral-600"]},
    -${shadowSpacing.base[0]} -${shadowSpacing.base[1]} 0 ${color["neutral-600"]},
    ${shadowSpacing.base[0]} -${shadowSpacing.base[1]} 0 ${color["neutral-600"]},
    -${shadowSpacing.base[0]} ${shadowSpacing.base[1]} 0 ${color["neutral-600"]},
    ${shadowSpacing.base[0]} ${shadowSpacing.base[1]} 0 ${color["neutral-600"]},
    -${shadowSpacing.base[1]} -${shadowSpacing.base[0]} 0 ${color["neutral-600"]},
    ${shadowSpacing.base[1]} -${shadowSpacing.base[0]} 0 ${color["neutral-600"]},
    -${shadowSpacing.base[1]} ${shadowSpacing.base[0]} 0 ${color["neutral-600"]},
    ${shadowSpacing.base[1]} ${shadowSpacing.base[0]} 0 ${color["neutral-600"]},
    ${shadowSpacing.base[0]} ${shadowSpacing.base[3]} 0 ${color["neutral-600"]},
    ${shadowSpacing.base[1]} ${shadowSpacing.base[3]} 0 ${color["neutral-600"]},
    ${shadowSpacing.base[2]} ${shadowSpacing.base[3]} 0 ${color["neutral-600"]},
    ${shadowSpacing.base[3]} ${shadowSpacing.base[3]} 0 ${color["neutral-600"]},
    ${shadowSpacing.base[3]} ${shadowSpacing.base[2]} 0 ${color["neutral-600"]},
    ${shadowSpacing.base[3]} ${shadowSpacing.base[1]} 0 ${color["neutral-600"]},
    ${shadowSpacing.base[3]} ${shadowSpacing.base[0]} 0 ${color["neutral-600"]}`,
  "bold-lg": `-${shadowSpacing.lg[1]} -${shadowSpacing.lg[1]} 0 ${color["neutral-600"]},
    ${shadowSpacing.lg[1]} -${shadowSpacing.lg[1]} 0 ${color["neutral-600"]},
    -${shadowSpacing.lg[1]} ${shadowSpacing.lg[1]} 0 ${color["neutral-600"]},
    ${shadowSpacing.lg[1]} ${shadowSpacing.lg[1]} 0 ${color["neutral-600"]},
    -${shadowSpacing.lg[0]} -${shadowSpacing.lg[1]} 0 ${color["neutral-600"]},
    ${shadowSpacing.lg[0]} -${shadowSpacing.lg[1]} 0 ${color["neutral-600"]},
    -${shadowSpacing.lg[0]} ${shadowSpacing.lg[1]} 0 ${color["neutral-600"]},
    ${shadowSpacing.lg[0]} ${shadowSpacing.lg[1]} 0 ${color["neutral-600"]},
    -${shadowSpacing.lg[1]} -${shadowSpacing.lg[0]} 0 ${color["neutral-600"]},
    ${shadowSpacing.lg[1]} -${shadowSpacing.lg[0]} 0 ${color["neutral-600"]},
    -${shadowSpacing.lg[1]} ${shadowSpacing.lg[0]} 0 ${color["neutral-600"]},
    ${shadowSpacing.lg[1]} ${shadowSpacing.lg[0]} 0 ${color["neutral-600"]},
    ${shadowSpacing.lg[0]} ${shadowSpacing.lg[3]} 0 ${color["neutral-600"]},
    ${shadowSpacing.lg[1]} ${shadowSpacing.lg[3]} 0 ${color["neutral-600"]},
    ${shadowSpacing.lg[2]} ${shadowSpacing.lg[3]} 0 ${color["neutral-600"]},
    ${shadowSpacing.lg[3]} ${shadowSpacing.lg[3]} 0 ${color["neutral-600"]},
    ${shadowSpacing.lg[3]} ${shadowSpacing.lg[2]} 0 ${color["neutral-600"]},
    ${shadowSpacing.lg[3]} ${shadowSpacing.lg[1]} 0 ${color["neutral-600"]},
    ${shadowSpacing.lg[3]} ${shadowSpacing.lg[0]} 0 ${color["neutral-600"]}`,
  "bold-xl": `-${shadowSpacing.xl[1]} -${shadowSpacing.xl[1]} 0 ${color["neutral-600"]},
    ${shadowSpacing.xl[1]} -${shadowSpacing.xl[1]} 0 ${color["neutral-600"]},
    -${shadowSpacing.xl[1]} ${shadowSpacing.xl[1]} 0 ${color["neutral-600"]},
    ${shadowSpacing.xl[1]} ${shadowSpacing.xl[1]} 0 ${color["neutral-600"]},
    -${shadowSpacing.xl[0]} -${shadowSpacing.xl[1]} 0 ${color["neutral-600"]},
    ${shadowSpacing.xl[0]} -${shadowSpacing.xl[1]} 0 ${color["neutral-600"]},
    -${shadowSpacing.xl[0]} ${shadowSpacing.xl[1]} 0 ${color["neutral-600"]},
    ${shadowSpacing.xl[0]} ${shadowSpacing.xl[1]} 0 ${color["neutral-600"]},
    -${shadowSpacing.xl[1]} -${shadowSpacing.xl[0]} 0 ${color["neutral-600"]},
    ${shadowSpacing.xl[1]} -${shadowSpacing.xl[0]} 0 ${color["neutral-600"]},
    -${shadowSpacing.xl[1]} ${shadowSpacing.xl[0]} 0 ${color["neutral-600"]},
    ${shadowSpacing.xl[1]} ${shadowSpacing.xl[0]} 0 ${color["neutral-600"]},
    ${shadowSpacing.xl[0]} ${shadowSpacing.xl[3]} 0 ${color["neutral-600"]},
    ${shadowSpacing.xl[1]} ${shadowSpacing.xl[3]} 0 ${color["neutral-600"]},
    ${shadowSpacing.xl[2]} ${shadowSpacing.xl[3]} 0 ${color["neutral-600"]},
    ${shadowSpacing.xl[3]} ${shadowSpacing.xl[3]} 0 ${color["neutral-600"]},
    ${shadowSpacing.xl[3]} ${shadowSpacing.xl[2]} 0 ${color["neutral-600"]},
    ${shadowSpacing.xl[3]} ${shadowSpacing.xl[1]} 0 ${color["neutral-600"]},
    ${shadowSpacing.xl[3]} ${shadowSpacing.xl[0]} 0 ${color["neutral-600"]}`,
};

export const theme = { color, textShadow };
