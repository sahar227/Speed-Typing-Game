import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import './styles.scss';
import Settings from './components/Settings';
import { Route, BrowserRouter as Router } from "react-router-dom";
import HighScores from './components/HighScores';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/Speed-Typing-Game" component={Home} />
        <Route path="/settings" component={Settings} />
        <Route path="/high_scores" component={HighScores} />
      </div>
    </Router>
  );
}

export default App;
