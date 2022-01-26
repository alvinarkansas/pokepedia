import React, { useState, useEffect } from "react";
import axios from "axios";

const Explore = () => {
  const [pokemons, setPokemons] = useState([]);

  const loadPokemons = async () => {
    const { data } = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0"
    );
    console.log(data.results);
    setPokemons(data.results);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return (
    <div>
      <h1>Challenge &amp; catch them all</h1>
      {pokemons.length &&
        pokemons.map((pokemon: { name: string; url: string }) => (
          <p>{pokemon.name}</p>
        ))}
    </div>
  );
};

export default Explore;
