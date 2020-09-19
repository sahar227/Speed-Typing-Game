import React from 'react'
import "./GamePiece.css"

function GamePiece({ text, speed, removeWord, reduceLife, color }) {
    const handleAnimationEnd = () => {
        reduceLife();
        removeWord();
    };

    console.log(color)
    return (
        <div onAnimationEnd={handleAnimationEnd} style={{ animation: `left_to_right ${speed}s linear forwards` }}>
            <p style={{ color: color }} className="game-piece">{text}</p>
        </div>
    )
}

export default GamePiece
