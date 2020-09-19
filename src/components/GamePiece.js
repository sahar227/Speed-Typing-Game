import React from 'react'
import "./GamePiece.css"

function GamePiece({ text, speed, removeWord, reduceLife }) {
    const handleAnimationEnd = () => {
        reduceLife();
        removeWord();
    };

    const RandomColors = ["red", "green", "yellow", "blue", "black", "white"];

    const chooseRandomColor = () => {
        return {
            color: String(RandomColors[Math.round(Math.random() * RandomColors.length)])
        }
    }
    return (
        <div onAnimationEnd={handleAnimationEnd} style={{ animation: `left_to_right ${speed}s linear forwards` }}>
            <p style={chooseRandomColor()} className="game-piece">{text}</p>
        </div>
    )
}

export default GamePiece
