import React, { useState, useEffect } from 'react';
import PokemonCardItem from './pokemonCartItem';
import * as styled from '../pages/home/styled';

export default (props) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(props.cart.reduce((acu, item) => acu + item.price, 0));
  }, [props.cart]);

  return (
    <styled.Card className="card">
      <h5 className="card-header">Carrinho</h5>
      <div className="col">
        {props.cart.map((item) => (
          <PokemonCardItem item={item} key={item.id} />
        ))}
      </div>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h6 className="card-header">TOTAL</h6>
        <h6 className="card-header">{`R$ ${total}`}</h6>
      </div>
      <div className="row">
        <div className="col" style={{ padding: 30 }}>
          <styled.Button onClick={() => props.onEndBuy()}>
            Finalizar compra
          </styled.Button>
        </div>
      </div>
    </styled.Card>
  );
};
