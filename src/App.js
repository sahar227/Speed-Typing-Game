import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import './styles.scss';
import Settings from './components/Settings';
import { Route, BrowserRouter as Router } from "react-router-dom";
import HighScores from './components/HighScores';

function App() {
  // const [speed, setSpeed] = useState(1);
  // const [numberOfWords, setNumberOfWords] = useState(20);
  // const [randomColors, setRandomColors] = useState(false);
  const settings = {
    speed: useState(1),
    numberOfWords: useState(20),
    randomColors: useState(false)
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/Speed-Typing-Game" render={() => <Home settings={settings} />} />
        <Route path="/settings" render={() => <Settings settings={settings} />} />
        <Route path="/high_scores" component={HighScores} />
      </div>
    </Router>
  );
}

export default App;
