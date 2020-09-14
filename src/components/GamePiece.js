import React from 'react'
import "./GamePiece.css"

function GamePiece({ id, text, speed }) {

    var element_id = id + "_piece"
    var time_is_up = function () {
        console.log(text + " done")
        element_id = document.getElementById(element_id);
        element_id.setAttribute("id", id + "_piece_finished");
    }

    var timeout_speed = speed * 1000 - 500;
    var timeout = setTimeout(time_is_up, timeout_speed);

    return (
        <div className="game-piece">
            <div>
                <p id={element_id} style={{ animation: `marquee ${speed}s linear forwards` }}>{text}</p>
            </div>
        </div >
    )
}

export default GamePiece
