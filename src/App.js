import React, {useState} from 'react';
import './App.css';
import Header from './components/Header'
import Body from './components/Body'
import GameBoard from './components/GameBoard'
import Score from './components/Score'

import './styles.scss';

function App() {
  const [score, setScore] = useState(0);
  return (
    <>
      <div className="App">
        <Header />
        <Body />
        <Score score={score}/>
        <GameBoard setScore={setScore}/>
      </div>
    </>
  );
}

export default App;
