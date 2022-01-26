import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const { name } = useParams();
  const [types, setTypes] = useState([]);
  const [moves, setMoves] = useState([]);
  const [sprite, setSprite] = useState("");

  const loadPokemon = async () => {
    // prettier-ignore
    const { data: { types, sprites, moves } } = await axios.get("https://pokeapi.co/api/v2/pokemon/" + name);
    setTypes(types.map((type: any) => type.type.name));
    setMoves(moves.map((move: any) => move.move.name));
    setSprite(sprites.front_default);
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
      }}
    >
      <h2>{name}</h2>

      <img src={sprite} alt={name} width={256} height={256} />

      <div>
        <h3>Type</h3>
        {types.map((type: any) => (
          <div>
            <span>{type}</span>
          </div>
        ))}
      </div>

      <div>
        <h3>Moves</h3>
        {moves.map((move: any) => (
          <div>
            <span>{move}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;
