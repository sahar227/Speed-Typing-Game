import React from 'react'
import "./GamePiece.css"

function GamePiece({text, speed, gameStarted, removeWord}) {
    const style = {
        animation: gameStarted ? `marquee ${speed}s linear forwards` : '',
        display: gameStarted ? 'block' : 'none'
    }
    return (
        <div className="game-piece">
            <div>
                <p onAnimationEnd={removeWord} style={style}>{text}</p>
            </div>
        </div >
    )
}

export default GamePiece
