import React, {useState} from 'react'
import './GameBoard.css'
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import GamePiece from './GamePiece';

function GameBoard({addToScore}) {
    const [gameStarted, setGameStarted] = useState(false);
    const [input, setInput] = useState('');

    const all_data = [{ text: "Hello", speed: 6 }, { text: "my", speed: 2 }, { text: "TEST", speed: 3 }];
    const all_pieces = all_data.map((data, index) =>
        <GamePiece key={index} id={index} text={data.text} speed={data.speed} gameStarted={gameStarted}/>
    )
    const checkWord = (e) => {
        const currentInput = e.target.value;
        // TODO: consider using dictionary instead of array for more efficient search
        if(all_data.filter(data => data.text === currentInput).length > 0) {
            addToScore(10);
            setInput('');
        }
        else
            setInput(currentInput);
    }
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
                <Input id="game_txt" value={input} onChange={checkWord} className="game_txt" placeholder="Write Here and Press Enter" inputProps={{ 'aria-label': 'description' }} disabled={!gameStarted} />
            </div>
        </>
    )
}

export default GameBoard
