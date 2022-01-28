import React, { HTMLAttributes } from "react";
import styled from "@emotion/styled";
import pokeball from "../images/pokeball.png";
import Text from "./Text";
import { theme } from "../utils";

interface IPokeCard extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  nickname?: string;
  captured?: number;
}

const getStyle = ({ nickname }: IPokeCard) => {
  return `
    .capture-qty,
    button {
      position: absolute;
      top: 4px;
      right: 8px;
      display: flex;
      gap: 4px;
      align-items: center;
    }
    cursor: ${nickname ? "default" : "pointer"};
    &:hover {
      background-color: ${nickname ? theme.color["neutral-100"] : theme.color["neutral-200"]};
    }
    &:active::after {
      box-shadow: inset ${nickname ? "-4px -4px" : "4px 4px"} ${theme.color["neutral-300"]};
    }
  `;
};

const PixelatedPokeCard = styled("div")((props: IPokeCard) => getStyle(props));

const PokeCard = ({ name, nickname, captured, children }: IPokeCard) => {
  return (
    <PixelatedPokeCard nickname={nickname} className="pxl-border">
      {nickname && (
        <Text variant="darker" size="lg">
          {nickname}
        </Text>
      )}
      <Text>{name}</Text>
      {children}
      {captured ? (
        <div className="capture-qty">
          <img src={pokeball} alt="pokeball" width={16} height={16} />
          <Text>x{captured}</Text>
        </div>
      ) : null}
    </PixelatedPokeCard>
  );
};

export default PokeCard;
