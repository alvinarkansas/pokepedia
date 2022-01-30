import React, { useState, useEffect, createRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { IPokemon, IAllPokemonResponse } from "../interface";
import Button from "../components/Button";
import Text from "../components/Text";
import PokeCard from "../components/PokemonCard";
import styled from "@emotion/styled";
import { useGlobalContext } from "../context";
import Loading from "../components/Loading";

const Page = styled("div")({
  padding: "0 16px",
  "@media (min-width: 1024px)": {
    padding: "0 128px",
  },
  h1: {
    padding: "16px 0",
  },
});

const Grid = styled("div")({
  display: "grid",
  gap: "16px",
  "@media (min-width: 640px)": {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  "@media (min-width: 1024px)": {
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  },
  "@media (min-width: 1280px)": {
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
  },
});

const Footer = styled("div")({
  display: "flex",
  paddingTop: "24px",
});

const Explore = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [pokeURL, setPokeURL] = useState<string>("https://pokeapi.co/api/v2/pokemon?limit=60&offset=0");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [navHeight, setNavHeight] = useState<number>(0);
  const { state } = useGlobalContext();
  const navRef = createRef<HTMLDivElement>();

  const loadPokemons = async () => {
    if (pokeURL) {
      try {
        setIsLoading(true);
        const { data } = await axios.get<IAllPokemonResponse>(pokeURL);

        const mapped = data.results.map((result) => {
          const summaryIdx = state.pokeSummary!.findIndex((el) => el.name === result.name.toUpperCase());
          return {
            name: result.name,
            url: result.url,
            captured: state.pokeSummary![summaryIdx]?.captured || 0,
          };
        });

        setPokemons((prevState) => [...prevState, ...mapped]);
        setPokeURL(data.next || "");
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setNavHeight(navRef.current?.clientHeight!);
    loadPokemons();
  }, []);

  return (
    <>
      <Page style={{ marginBottom: navHeight }}>
        <Text as="h1" variant="darker" size="lg">
          Challenge &amp; catch them all
        </Text>
        <Grid>
          {pokemons.length &&
            pokemons.map((pokemon: IPokemon) => (
              <Link key={pokemon.name} to={"/" + pokemon.name} style={{ display: "flex" }}>
                <PokeCard name={pokemon.name} captured={pokemon.captured} />
              </Link>
            ))}
        </Grid>
        {!isLoading ? (
          pokeURL && (
            <Footer>
              <Button onClick={() => loadPokemons()}>Load More</Button>
            </Footer>
          )
        ) : (
          <Loading label="Please wait..." />
        )}
      </Page>

      <Navbar ref={navRef} />
    </>
  );
};

export default Explore;
