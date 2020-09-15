import React, {useState, useEffect} from 'react'
import './GameBoard.css'
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import GamePiece from './GamePiece';

function GameBoard({addToScore}) {
    const [gameStarted, setGameStarted] = useState(false);
    const [input, setInput] = useState('');
    const [activeWords, setActiveWords] = useState([]);
    const [nextWordIndex, setNextWordIndex] = useState(0);

    const all_data = [{ text: "Hello", speed: 6 }, { text: "my", speed: 2 }, { text: "TEST", speed: 3 }];
    const addWord = () => {
        // TODO: Add random word from all_data, make sure to not add same word twice
        setActiveWords((prev) => [...prev, all_data[nextWordIndex % all_data.length]]);
        setNextWordIndex(prev => prev + 1);
    }
    const removeWord = (word) => {
        setActiveWords(prev => prev.filter(data => data.text !== word));
    };

    useEffect(() => {
        if(!gameStarted)
            return;
        const interval = setInterval(() => {
            addWord();
        // TODO: Consider making the interval shorten over time
        }, 3000);
        return () => clearInterval(interval);
    }, [gameStarted, nextWordIndex]);

    const all_pieces = activeWords.map((data) =>
        <GamePiece key={data.text} text={data.text} speed={data.speed} gameStarted={gameStarted} removeWord={() => removeWord(data.text)}/>
    )
    const checkWord = (e) => {
        const currentInput = e.target.value;
        // TODO: consider using dictionary instead of array for more efficient search
        if(activeWords.filter(data => data.text === currentInput).length > 0) {
            addToScore(10);
            setInput('');
            // Destroy word - user already wrote it
            removeWord(currentInput);
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
