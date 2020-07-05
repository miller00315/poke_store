import React, { useState } from 'react';
import styled from 'styled-components';

const Sprite = styled.img`
  width: 2em;
  height: 2em;
  display: none;
`;

export default (props) => {
  const [isLoadingImg, setIsLoadingImg] = useState(true);
  const [toManyRequests, setTomanyRequests] = useState(false);

  return (
    <div className="row" style={{ flex: 1, justifyContent: 'space-between' }}>
      <div className="col">
        <div className="row">
          <div className="col-md-3">
            <Sprite
              className="card-img-top rounded mx-auto mt-2"
              src={props.item.imgUrl}
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
          </div>
          <div className="col-md-9">
            <text>{props.item.name}</text>
          </div>
        </div>
      </div>
      <div className="col">
        <text>{`R$ ${props.item.price}`}</text>
      </div>
    </div>
  );
};
