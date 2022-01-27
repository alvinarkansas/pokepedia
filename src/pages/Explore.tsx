import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { IPokemon, IAllPokemonResponse } from "../interface";
import pokeball from "../images/pokeball.png";

const StyledCard = styled.div`
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
  position: relative;

  &::after {
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

  .capture-qty {
    position: absolute;
    top: 4px;
    right: 8px;
    display: flex;
    gap: 4px;
    align-items: center;
  }
`;

const Explore = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  const loadPokemons = async () => {
    const { data } = await axios.get<IAllPokemonResponse>("https://pokeapi.co/api/v2/pokemon?limit=30&offset=0");

    const pokeSummary: IPokemon[] = loadPokeSummary();
    const mapped = data.results.map((result) => {
      const summaryIdx = pokeSummary.findIndex((el) => el.name === result.name.toUpperCase());
      return {
        name: result.name,
        url: result.url,
        captured: pokeSummary[summaryIdx]?.captured || 0,
      };
    });

    setPokemons(mapped);
  };

  const loadPokeSummary = () => {
    const pokeSummary = localStorage.getItem("pokeSummary");
    const parsed = JSON.parse(pokeSummary!) || [];
    return parsed;
  };

  useEffect(() => {
    console.log("🍀🍀🍀", pokemons);
  }, [pokemons]);

  useEffect(() => {
    loadPokemons();
  }, []);

  return (
    <div>
      <h1>Challenge &amp; catch them all</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {pokemons.length &&
          pokemons.map((pokemon: IPokemon) => (
            <Link key={pokemon.name} to={"/" + pokemon.name} style={{ display: "flex" }}>
              <StyledCard>
                <p>{pokemon.name}</p>
                {pokemon.captured ? (
                  <div className="capture-qty">
                    <img src={pokeball} alt="pokeball" width={16} height={16} />
                    <span>x{pokemon.captured}</span>
                  </div>
                ) : null}
              </StyledCard>
            </Link>
          ))}
      </div>

      <Navbar />
    </div>
  );
};

export default Explore;
