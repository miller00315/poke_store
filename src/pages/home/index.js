import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PokemonCard from '../../components/pokemondCard';
import SearchBar from '../../components/searchBar';
import PokemonCart from '../../components/pokemonCart';

export default function HomePage() {
  const [pokemons, setPokemons] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('pokemonCart'));

    if (cart) setCart(cart);

    axios
      .get(
        'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json'
      )
      .then((res) => {
        setPokemons(res.data.pokemon);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onSelectItem = (item) => {
    cart.push(item);
    setCart(cart);
    localStorage.setItem('pokemonCart', JSON.stringify(cart));
  };

  const onEndBuy = () => {
    localStorage.clear();
    setCart([]);
  };

  return (
    <main>
      <div className="row">
        <SearchBar />
      </div>
      <div className="row" style={{ padding: 30 }}>
        <div className="col-md-9 col-sm-8 mb-12">
          <div className="row">
            {pokemons.map((pokemon) => (
              <PokemonCard
                pokemon={pokemon}
                key={pokemon.id}
                onSelectItem={onSelectItem}
              />
            ))}
          </div>
        </div>
        <div className="col-md-3 col-sm-4 mb-12">
          <PokemonCart cart={cart} onEndBuy={onEndBuy} />
        </div>
      </div>
    </main>
  );
}
