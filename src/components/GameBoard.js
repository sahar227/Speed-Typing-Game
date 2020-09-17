import React, {useState, useEffect, useRef} from 'react'
import './GameBoard.css'
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import GamePiece from './GamePiece';
import axios from 'axios';

// const all_data = [{ text: "Hello"}, { text: "my"}, { text: "TEST"}];
const amountOfWords = 20;

function GameBoard({setScore}) {
    const [gameStarted, setGameStarted] = useState(false);
    const [input, setInput] = useState('');
    const [activeWords, setActiveWords] = useState([]);
    const [allData, setAllData] = useState([]);
    const [timesRestarted, setTimesRestarted] = useState(0);
    const nextWordIndex = useRef(0);
    const baseGameSpeed = useRef(5);
    const speedModifier = useRef(3);
    const removeWord = (word) => {
        setActiveWords(prev => prev.filter(data => data.text !== word));
    };

    const addToScore = (points) => {
        setScore((prev) => prev + points);
      };
    useEffect(() => {
        const fetchItems = async () => {
            const words = await axios(
                `https://random-word-api.herokuapp.com//word?number=${amountOfWords}`
            );
            setAllData(words.data.map(word => { return {text: word}}));
        }
        fetchItems();
    }, [timesRestarted]);

    useEffect(() => {
        if(!gameStarted || nextWordIndex.current >= allData.length)
            return;
        const addWord = () => {
            setActiveWords((prev) => [...prev, {...allData[nextWordIndex.current], speed: baseGameSpeed.current + Math.random() * speedModifier.current, key: nextWordIndex.current}]);
            nextWordIndex.current = nextWordIndex.current + 1;
        }
        const interval = setInterval(() => {
            addWord();
        // TODO: Consider making the interval shorten over time
        }, 3000);
        return () => clearInterval(interval);
    }, [gameStarted, allData]);

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
            nextWordIndex.current = 0;
            setActiveWords([]);
            setInput('');
            setScore(0);
            setTimesRestarted(prev => prev + 1);
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
