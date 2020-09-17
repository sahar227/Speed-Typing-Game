import React from 'react'
import "./GamePiece.css"

function GamePiece({text, speed, removeWord, reduceLife}) {
    const handleAnimationEnd = () => {
        reduceLife();
        removeWord();
    };
    return (
            <div onAnimationEnd={handleAnimationEnd} style={{animation: `left_to_right ${speed}s linear forwards`}}>
                <p className="game-piece">{text}</p>
            </div>
    )
}

export default GamePiece
