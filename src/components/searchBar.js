import React from 'react';

export default (props) => {
  return (
    <div style={{ flex: 1, padding: 30 }}>
      <form>
        <input
          placeholder="Pokemon"
          className="form-control mx-auto"
          onChange={(event) => props.onTextChanged(event.target.value)}
          style={{
            backgroundColor: 'white transparent',
            height: '1.75em',
            width: '95%',
            borderRadius: '15px',
            opacity: '0.8',
            fontSize: '1.75em',
          }}
        />
      </form>
    </div>
  );
};
