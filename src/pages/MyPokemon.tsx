import React, { createRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { IMyPokemon } from "../interface";
import Text from "../components/Text";
import PokeCard from "../components/PokemonCard";
import DeleteButton from "../components/ButtonIcon";
import { spacing } from "../utils";

const Page = styled("div")({
  padding: "0 16px",
});

const Header = styled("header")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "16px 0",
});

const Grid = styled("div")(
  {
    display: "grid",
    gap: "16px",
  },
  `
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  `
);

const EmptyState = styled("div")({
  height: "50vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: spacing.base,
});

const MyPokemon = () => {
  const [pokemons, setPokemons] = useState<IMyPokemon[]>([]);
  const [navHeight, setNavHeight] = useState(0);
  const navRef = createRef<HTMLDivElement>();

  const loadMyPokemon = () => {
    const rawPokemons = localStorage.getItem("myPokemon");
    const parsed = JSON.parse(rawPokemons!) || [];
    setPokemons(parsed);
  };

  useEffect(() => {
    setNavHeight(navRef.current?.clientHeight!);
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
    <>
      <Page style={{ marginBottom: navHeight }}>
        <Header>
          <Text as="h1" variant="darker" size="lg">
            My Pokemon
          </Text>
          <Text as="span" variant="darker" size="lg">
            Total: {pokemons.length}
          </Text>
        </Header>

        {pokemons.length ? (
          <Grid>
            {pokemons.length &&
              pokemons.reverse().map((pokemon: { name: string; nickname: string }) => (
                <div key={pokemon.nickname} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <PokeCard name={pokemon.name} nickname={pokemon.nickname}>
                    <DeleteButton onClick={() => releasePokemon(pokemon.nickname)} />
                  </PokeCard>
                </div>
              ))}
          </Grid>
        ) : (
          <EmptyState>
            <Text>You haven't caught any pokemon</Text>
            <Link to="/">
              <Button>Explore</Button>
            </Link>
          </EmptyState>
        )}
      </Page>

      <Navbar ref={navRef} />
    </>
  );
};

export default MyPokemon;
