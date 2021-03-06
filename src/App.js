import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import './styles.scss';
import Settings from './components/Settings';
import { Route, HashRouter as Router } from "react-router-dom";
import HighScores from './components/HighScores';

function App() {
  const settings = {
    speed: useState(1),
    numberOfWords: useState(20),
    randomColors: useState(false)
  };

  useEffect(() => {
    if (localStorage.getItem("speed") !== undefined && localStorage.getItem("speed") !== null) {
        settings.speed[1](localStorage.getItem("speed"));
    }
    if (localStorage.getItem("numberOfWords") !== undefined && localStorage.getItem("numberOfWords") !== null) {
        settings.numberOfWords[1](parseInt(localStorage.getItem("numberOfWords")));
    }
    if (localStorage.getItem("randomColors") !== undefined && localStorage.getItem("randomColors") !== null) {
        settings.randomColors[1](localStorage.getItem("randomColors") === 'true');
    }
}, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/" render={() => <Home settings={settings} />} />
        <Route path="/settings" render={() => <Settings settings={settings} />} />
        <Route path="/high_scores" component={HighScores} />
      </div>
    </Router>
  );
}

export default App;
