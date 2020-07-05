import React, { useState } from 'react';
import styled from 'styled-components';
import spinner from '../assets/images/spinner.gif';

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

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

export default (props) => {
  const [pokemon] = useState(props.pokemon);
  const [imgUrl] = useState(
    `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemon.id}.png?raw=true`
  );
  const [isLoadingImg, setIsLoadingImg] = useState(true);
  const [toManyRequests, setTomanyRequests] = useState(false);
  const [price] = useState(pokemon.id * 100);

  const handlerClick = () => {
    props.onSelectItem({ ...pokemon, imgUrl, price });
  };

  return (
    <div className="col-md-4 col-sm-6 mb-5">
      <Card className="card" onClick={() => handlerClick()}>
        <h5 className="card-header">{pokemon.id}</h5>
        {isLoadingImg ? (
          <img
            src={spinner}
            alt="pokemon"
            style={{ width: '5em', height: '5em' }}
            className="card-img-top rounded mx-auto d-block mt-2"
          />
        ) : null}
        <Sprite
          className="card-img-top rounded mx-auto mt-2"
          src={imgUrl}
          onLoad={() => setIsLoadingImg(false)}
          onError={() => setTomanyRequests(true)}
          style={
            toManyRequests
              ? { display: 'none' }
              : isLoadingImg
              ? null
              : { display: 'block' }
          }
        />
        {toManyRequests ? (
          <h6 className="mx-auto">
            <span className="badge badge-danger mt-2">Muitas requisições</span>
          </h6>
        ) : null}
        <div className="card-body mx-auto">
          <h6 className="card-title">
            {pokemon.name
              .toLowerCase()
              .split(' ')
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(' ')}
          </h6>
        </div>
        <h6 className="mx-auto">
          <span className="badge badge-success mt-2">{`R$ ${price}`}</span>
        </h6>
      </Card>
    </div>
  );
};
