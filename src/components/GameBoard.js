import React, { useEffect } from 'react'
import './GameBoard.css'
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import GamePiece from './GamePiece';

function GameBoard() {
    var all_data = [{ text: "Hello", speed: 6 }, { text: "my", speed: 2 }, { text: "TEST", speed: 3 }];

    var all_pieces = all_data.map((data, index) =>
        <GamePiece id={index} text={data.text} speed={data.speed} />
    )

    useEffect(() => {
        var game_txt = document.getElementById('game_txt')

        game_txt.addEventListener("onKeyUp", Check);
        var Check = function (e) {
            console.log("hi")
            if (e.keyCode === 13) {
                game_txt[0].value = "";
            }
        }
    });

    return (
        <>
            <div className="gameBoard">
                {all_pieces}
            </div>
            <div className="buttonsRow">
                <Button className="start_game_btn" variant="contained" color="primary">
                    Start Game
                </Button >
                <br />
                <Input id="game_txt" className="game_txt" placeholder="Write Here and Press Enter" inputProps={{ 'aria-label': 'description' }} />
            </div>
        </>
    )
}

export default GameBoard
