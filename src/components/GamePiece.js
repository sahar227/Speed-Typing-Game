import React from 'react'
import "./GamePiece.css"

function GamePiece({text, speed, removeWord}) {
    return (
            <div onAnimationEnd={removeWord} style={{animation: `left_to_right ${speed}s linear forwards`}}>
                <p className="game-piece">{text}</p>
            </div>
    )
}

export default GamePiece
