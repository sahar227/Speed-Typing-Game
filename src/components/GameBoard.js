import React, {useState} from 'react'
import './GameBoard.css'
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import GamePiece from './GamePiece';

function GameBoard() {
    const [gameStarted, setGameStarted] = useState(false);

    const all_data = [{ text: "Hello", speed: 6 }, { text: "my", speed: 2 }, { text: "TEST", speed: 3 }];
    const all_pieces = all_data.map((data, index) =>
        <GamePiece key={index} id={index} text={data.text} speed={data.speed} gameStarted={gameStarted}/>
    )

    return (
        <>
            <div className="gameBoard">
                {all_pieces}
            </div>
            <div className="buttonsRow">
                <Button className="start_game_btn" variant="contained" color="primary" onClick={() => setGameStarted(true)}>
                    Start Game
                </Button >
                <br />
                <Input id="game_txt" className="game_txt" placeholder="Write Here and Press Enter" inputProps={{ 'aria-label': 'description' }} />
            </div>
        </>
    )
}

export default GameBoard
