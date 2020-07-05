import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import PokemonCard from '../../components/pokemondCard';
import SearchBar from '../../components/searchBar';
import PokemonCart from '../../components/pokemonCart';
import * as styled from './styled';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement(document.getElementById('root'));

export default function HomePage() {
  const [pokemons, setPokemons] = useState([]);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pokemonsSearch, setPokemonsSearch] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cart.length === 0) {
      const localHostCart = JSON.parse(localStorage.getItem('pokemonCart'));

      if (localHostCart) {
        setCart(localHostCart);
        setTotal(localHostCart.reduce((acu, item) => acu + item.price, 0));
      }
    }

    if (pokemons.length === 0)
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
  }, [pokemons, cart, total]);

  const onSelectItem = (item) => {
    cart.push(item);
    setCart(cart);
    localStorage.setItem('pokemonCart', JSON.stringify(cart));
    setTotal(cart.reduce((acu, item) => acu + item.price, 0));
  };

  const onEndBuy = () => setShowModal(true);

  const handlerModalClose = () => {
    setShowModal(false);
    localStorage.clear();
    setCart([]);
  };

  const onTextChanged = (text) => {
    if (text !== '') {
      setPokemonsSearch(
        pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(text.toLowerCase())
        )
      );
      return;
    }
    setPokemonsSearch([]);
  };

  return (
    <main>
      <div className="row">
        <SearchBar onTextChanged={onTextChanged} />
      </div>
      <div className="row" style={{ padding: 30 }}>
        <div className="col-md-9 col-sm-8 mb-12">
          <div className="row">
            {pokemonsSearch.length === 0
              ? pokemons.map((pokemon) => (
                  <PokemonCard
                    pokemon={pokemon}
                    key={pokemon.id}
                    onSelectItem={onSelectItem}
                  />
                ))
              : pokemonsSearch.map((pokemon) => (
                  <PokemonCard
                    pokemon={pokemon}
                    key={pokemon.id}
                    onSelectItem={onSelectItem}
                  />
                ))}
          </div>
        </div>
        <div className="col-md-3 col-sm-4 mb-12">
          <PokemonCart cart={cart} onEndBuy={onEndBuy} total={total} />
        </div>
      </div>
      <Modal isOpen={showModal} style={customStyles} contentLabel="PokeStore">
        <h2>Parabéns</h2>
        <h5>Compra realizada consucesso!!</h5>
        <styled.Button onClick={() => handlerModalClose()}>
          Fechar
        </styled.Button>
      </Modal>
    </main>
  );
}
