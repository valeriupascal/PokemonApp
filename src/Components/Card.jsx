import React from "react";

const Card = ({ pokemon, loading, infoPokemon}) => {
  console.log(pokemon);
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon.map((pokemon) => {
          return (
            <>
              <div className="card" key={pokemon.id} onClick={() => infoPokemon(pokemon)}>
                <h2>{pokemon.id}</h2>
                <img src={pokemon.sprites.front_default} alt="pokemon.name" />
                <h2>{pokemon.name}</h2>
              </div>
            </>
          );
        })
      )}
    </>
  );
};

export default Card;
