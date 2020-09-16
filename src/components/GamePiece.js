import React from 'react'
import "./GamePiece.css"

function GamePiece({text, speed, gameStarted, removeWord}) {
    return (
        <div className="game-piece">
            <div>
                <p onAnimationEnd={removeWord} style={{animation: `marquee ${speed}s linear forwards`}}>{text}</p>
            </div>
        </div >
    )
}

export default GamePiece
