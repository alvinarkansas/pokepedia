import React, { createRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { IMyPokemon } from "../interface";
import Text from "../components/Text";
import PokeCard from "../components/PokemonCard";
import DeleteButton from "../components/DeleteButton";
import { spacing } from "../utils";
import { useGlobalContext } from "../context";
import { generatePokeSummary } from "../helpers";

const Page = styled("div")({
  padding: "0 16px",
  "@media (min-width: 1024px)": {
    padding: "0 128px",
  },
});

const Header = styled("header")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "16px 0",
});

const Grid = styled("div")({
  display: "grid",
  gap: "16px",
  "@media (min-width: 640px)": {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  "@media (min-width: 1024px)": {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  },
  "@media (min-width: 1280px)": {
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  },
});

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
  const [navHeight, setNavHeight] = useState<number>(0);
  const { setState } = useGlobalContext();
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

  const releasePokemon = (nickname: string) => {
    const newCollection = pokemons.filter((pokemon: IMyPokemon) => pokemon.nickname !== nickname);
    localStorage.setItem("myPokemon", JSON.stringify(newCollection));
    loadMyPokemon();
    setState({ pokeSummary: generatePokeSummary(newCollection) });
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
