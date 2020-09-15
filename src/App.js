import React, {useState} from 'react';
import './App.css';
import Header from './components/Header'
import Body from './components/Body'
import GameBoard from './components/GameBoard'
import Score from './components/Score'

import './styles.scss';

function App() {
  const [score, setScore] = useState(0);
  const addToScore = (points) => {
    setScore((prev) => prev + points);
  };
  return (
    <>
      <div className="App">
        <Header />
        <Body />
        <Score score={score}/>
        <GameBoard addToScore={addToScore}/>
      </div>
    </>
  );
}

export default App;
