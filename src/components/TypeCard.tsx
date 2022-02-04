import React from "react";
import styled from "@emotion/styled";
import Text from "./Text";

interface ITypeCardProps {
  type: string;
}

const color: { [key: string]: string } = {
  "normal-100": "#CDCDA8",
  "normal-200": "#A8A878",
  "normal-300": "#818163",
  "fire-100": "#F6A66C",
  "fire-200": "#F08030",
  "fire-300": "#CB641D",
  "fighting-100": "#E9625A",
  "fighting-200": "#C03028",
  "fighting-300": "#7D1F1A",
  "water-100": "#98B6FF",
  "water-200": "#6890F0",
  "water-300": "#445E9C",
  "flying-100": "#C2B1F6",
  "flying-200": "#A890F0",
  "flying-300": "#6D5E9C",
  "grass-100": "#92E469",
  "grass-200": "#78C850",
  "grass-300": "#4E8234",
  "poison-100": "#C080C0",
  "poison-200": "#A040A0",
  "poison-300": "#682A68",
  "electric-100": "#F8E084",
  "electric-200": "#F8D030",
  "electric-300": "#BD9E21",
  "ground-100": "#F8DD95",
  "ground-200": "#E0C068",
  "ground-300": "#927D44",
  "psychic-100": "#F488A9",
  "psychic-200": "#F85888",
  "psychic-300": "#A23B5B",
  "rock-100": "#DCC873",
  "rock-200": "#B8A038",
  "rock-300": "#796824",
  "ice-100": "#B7F3F3",
  "ice-200": "#98D8D8",
  "ice-300": "#41A8A8",
  "bug-100": "#CFDF46",
  "bug-200": "#A8B820",
  "bug-300": "#6D7815",
  "dragon-100": "#B8A0F8",
  "dragon-200": "#7038F8",
  "dragon-300": "#483890",
  "ghost-100": "#9D84C7",
  "ghost-200": "#705898",
  "ghost-300": "#493964",
  "dark-100": "#967F6F",
  "dark-200": "#705848",
  "dark-300": "#49392F",
  "steel-100": "#DCDCF0",
  "steel-200": "#B8B8D0",
  "steel-300": "#787887",
  "fairy-100": "#FFD9DD",
  "fairy-200": "#F0B6BC",
  "fairy-300": "#D87881",
};

const PixelatedTypeCard = styled("div")(({ type }: ITypeCardProps) => {
  return {
    marginRight: 16,
    background: color[type + "-200"],
    "&:not(.no-inset)::after": {
      boxShadow: `inset -4px -4px ${color[type + "-300"]}, inset 4px 4px ${color[type + "-100"]}`,
    },
  };
});

const TypeCard = ({ type }: ITypeCardProps) => {
  return (
    <PixelatedTypeCard type={type} className="pxl-border">
      <Text variant="outlined" size="lg">
        {type}
      </Text>
    </PixelatedTypeCard>
  );
};

export default TypeCard;
