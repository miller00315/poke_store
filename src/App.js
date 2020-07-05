import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import HomePage from './pages/home';

import backgroundImge from './assets/images/pattern.png';

function App() {
  return (
    <div className="App" style={{ background: `url(${backgroundImge})` }}>
      <HomePage />
    </div>
  );
}

export default App;
