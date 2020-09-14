import React from 'react'
import "./GamePiece.css"

function GamePiece({ id, text, speed, gameStarted }) {
    const animationStyle = gameStarted ? `marquee ${speed}s linear forwards` : '';
    const style = {
        animation: gameStarted ? `marquee ${speed}s linear forwards` : '',
        display: gameStarted ? 'block' : 'none'
    }

    return (
        <div className="game-piece">
            <div>
                <p id={id} style={style}>{text}</p>
            </div>
        </div >
    )
}

export default GamePiece
