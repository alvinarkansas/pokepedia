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

const Page = styled("div")({
  padding: "0 16px",
  h1: {
    padding: "16px 0",
  },
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

const Footer = styled("div")({
  display: "flex",
  paddingTop: "24px",
});

const Explore = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [pokeURL, setPokeURL] = useState<string>("https://pokeapi.co/api/v2/pokemon?limit=30&offset=0");
  const [navHeight, setNavHeight] = useState(0);
  const { state } = useGlobalContext();
  const navRef = createRef<HTMLDivElement>();

  const loadPokemons = async () => {
    if (pokeURL) {
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
        <Footer>
          <Button onClick={() => loadPokemons()}>Load More</Button>
        </Footer>
      </Page>

      <Navbar ref={navRef} />
    </>
  );
};

export default Explore;
