import React, { useState, useEffect, useRef, createRef } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { IPokemon, IAllPokemonResponse } from "../interface";
import pokeball from "../images/pokeball.png";
import Button from "../components/Button";
import Text from "../components/Text";

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
  const [pokeURL, setPokeURL] = useState<string>("https://pokeapi.co/api/v2/pokemon?limit=30&offset=0");
  const [navHeight, setNavHeight] = useState(0);
  const navRef = createRef<HTMLDivElement>();

  const loadPokemons = async () => {
    if (pokeURL) {
      const { data } = await axios.get<IAllPokemonResponse>(pokeURL);

      const pokeSummary: IPokemon[] = loadPokeSummary();
      const mapped = data.results.map((result) => {
        const summaryIdx = pokeSummary.findIndex((el) => el.name === result.name.toUpperCase());
        return {
          name: result.name,
          url: result.url,
          captured: pokeSummary[summaryIdx]?.captured || 0,
        };
      });

      setPokemons((prevState) => [...prevState, ...mapped]);
      setPokeURL(data.next || "");
    }
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
    setNavHeight(navRef.current?.clientHeight!);
    loadPokemons();
  }, []);

  return (
    <>
      <div style={{ marginBottom: navHeight }}>
        <Text as="h1" variant="darker" size="lg" style={{ margin: "16px 0" }}>
          Challenge &amp; catch them all
        </Text>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {pokemons.length &&
            pokemons.map((pokemon: IPokemon) => (
              <Link key={pokemon.name} to={"/" + pokemon.name} style={{ display: "flex" }}>
                <StyledCard>
                  <Text>{pokemon.name}</Text>
                  {pokemon.captured ? (
                    <div className="capture-qty">
                      <img src={pokeball} alt="pokeball" width={16} height={16} />
                      <Text>x{pokemon.captured}</Text>
                    </div>
                  ) : null}
                </StyledCard>
              </Link>
            ))}
        </div>
        <div style={{ paddingTop: "24px", display: "flex" }}>
          <Button onClick={() => loadPokemons()}>Load More</Button>
        </div>
      </div>

      <Navbar ref={navRef} />
    </>
  );
};

export default Explore;
