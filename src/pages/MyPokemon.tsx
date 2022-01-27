import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { IMyPokemon, IPokemon } from "../interface";

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
  text-transform: uppercase;
  flex-grow: 1;

  &::after {
    position: absolute;
    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
    content: "";
    box-shadow: inset -4px -4px #adafbc;
  }
`;

const MyPokemon = () => {
  const [pokemons, setPokemons] = useState<IMyPokemon[]>([]);

  const loadMyPokemon = () => {
    const rawPokemons = localStorage.getItem("myPokemon");
    const parsed = JSON.parse(rawPokemons!) || [];
    setPokemons(parsed);
  };

  useEffect(() => {
    loadMyPokemon();
  }, []);

  useEffect(() => {
    let results: { name: string; captured: number }[] = [];

    pokemons.forEach((pokemon, idx) => {
      let pokemonExists = false;

      if (idx === 0) {
        results.push({ name: pokemon.name, captured: 1 });
      } else {
        for (let result of results) {
          if (result.name === pokemon.name) {
            pokemonExists = true;
          }
        }

        if (pokemonExists) {
          let pokemonIdx = results.findIndex((el) => el.name === pokemon.name);
          results[pokemonIdx].captured++;
        } else {
          results.push({ name: pokemon.name, captured: 1 });
        }
      }
    });

    console.log("🎗️", results);
    localStorage.setItem("pokeSummary", JSON.stringify(results));
  }, [pokemons]);

  const releasePokemon = (nickname: string) => {
    const newCollection = pokemons.filter((pokemon: IMyPokemon) => pokemon.nickname !== nickname);
    localStorage.setItem("myPokemon", JSON.stringify(newCollection));
    loadMyPokemon();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Challenge &amp; catch them all</h1>
        <span>Total: {pokemons.length}</span>
      </div>

      {pokemons.length ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {pokemons.length &&
            pokemons.reverse().map((pokemon: { name: string; nickname: string }) => (
              <div key={pokemon.nickname} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <StyledCard>
                  <p style={{ fontSize: 24 }}>{pokemon.nickname}</p>
                  <p>{pokemon.name}</p>
                </StyledCard>
                <span onClick={() => releasePokemon(pokemon.nickname)}>DELETE</span>
              </div>
            ))}
        </div>
      ) : (
        <div
          style={{
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          <p>You haven't caught any pokemon</p>
          <Link to="/">
            <Button>Explore</Button>
          </Link>
        </div>
      )}

      <Navbar />
    </div>
  );
};

export default MyPokemon;
