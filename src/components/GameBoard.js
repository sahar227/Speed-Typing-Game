import React, {useState, useEffect} from 'react'
import './GameBoard.css'
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import GamePiece from './GamePiece';

const all_data = [{ text: "Hello", speed: 6 }, { text: "my", speed: 2 }, { text: "TEST", speed: 3 }];

function GameBoard({setScore}) {
    const [gameStarted, setGameStarted] = useState(false);
    const [input, setInput] = useState('');
    const [activeWords, setActiveWords] = useState([]);
    const [nextWordIndex, setNextWordIndex] = useState(0);

    const removeWord = (word) => {
        setActiveWords(prev => prev.filter(data => data.text !== word));
    };

    const addToScore = (points) => {
        setScore((prev) => prev + points);
      };

    useEffect(() => {
        if(!gameStarted || nextWordIndex >= all_data.length)
            return;
        const addWord = () => {
            setActiveWords((prev) => [...prev, {...all_data[nextWordIndex], key: nextWordIndex}]);
            setNextWordIndex(prev => prev + 1);
        }
        const interval = setInterval(() => {
            addWord();
        // TODO: Consider making the interval shorten over time
        }, 3000);
        return () => clearInterval(interval);
    }, [gameStarted, nextWordIndex]);

    const all_pieces = activeWords.map((data) =>
        <GamePiece key={data.key} text={data.text} speed={data.speed} removeWord={() => removeWord(data.text)}/>
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
    const handleClick = () => {
        if(!gameStarted)
            setGameStarted(true);
        else { // restart the game
            setNextWordIndex(0);
            setActiveWords([]);
            setInput('');
            setScore(0);
        }
    }
    return (
        <>
            <div className="gameBoard">
                {all_pieces}
            </div>
            <div className="buttonsRow">
                <Button className="start_game_btn" variant="contained" color="primary" onClick={handleClick}>
                    {!gameStarted ? 'Start Game' : 'Restart Game'}
                </Button >
                <br />
                <Input value={input} onChange={checkWord} className="game_txt" placeholder="Write Here and Press Enter" inputProps={{ 'aria-label': 'description' }} disabled={!gameStarted} />
            </div>
        </>
    )
}

export default GameBoard
