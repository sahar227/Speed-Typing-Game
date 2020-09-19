import React, { useState } from 'react'
import GameBoard from './GameBoard';
import Score from './Score';

function Home({ settings }) {
    const [score, setScore] = useState(0);

    return (
        <div>
            <h1>Welcome to Speed Typing Game!</h1>
            <Score score={score} />
            <GameBoard score={score} settings={settings} setScore={setScore} />
        </div>
    )
}

export default Home
