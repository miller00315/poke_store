import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PokemonCardItem from './pokemonCartItem';

const Card = styled.div`
  opacity: 0.95;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const Button = styled.div`
  background: #0000ff;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  -webkit-appearance: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  height: 45px;
  margin: 0 auto 0;
  opacity: 0.5;
  width: 55%;
`;

export default (props) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(props.cart.reduce((acu, item) => acu + item.price, 0));
  }, [props.cart]);

  return (
    <Card className="card">
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
          <Button onClick={() => props.onEndBuy()}>Finalizar compra</Button>
        </div>
      </div>
    </Card>
  );
};
