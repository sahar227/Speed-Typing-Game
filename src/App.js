import React from 'react';
import './App.css';
import Header from './components/Header'
import Body from './components/Body'
import GameBoard from './components/GameBoard'

import './styles.scss';

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <Body />
        <GameBoard/>
      </div>
    </>
  );
}

export default App;
