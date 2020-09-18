import React, { useState, useEffect } from 'react'
import './GameBoard.css'
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import GamePiece from './GamePiece';
import axios from 'axios';

const amountOfWords = 20;
const startLife = 3;
const baseGameSpeed = 8;
const speedModifier = 5;

function GameBoard({ setScore }) {
    const [gameStarted, setGameStarted] = useState(false);
    const [input, setInput] = useState('');
    const [activeWords, setActiveWords] = useState([]);
    const [allData, setAllData] = useState([]);
    const [timesRestarted, setTimesRestarted] = useState(0);
    const [lives, setLives] = useState(startLife);
    const [nextWordIndex, setNextWordIndex] = useState(0);

    const restartGame = () => {
        setGameStarted(false);
        setActiveWords([]);
        setInput('');
        setTimesRestarted(prev => prev + 1);
    }

    const reduceLife = () => {
        setLives(prev => prev - 1);
        if (lives === 1) {
            restartGame();
        }
    };

    const removeWord = (word) => {
        setActiveWords(prev => prev.filter(data => data.text !== word));
    };

    const addToScore = (points) => {
        setScore((prev) => prev + points);
    };

    useEffect(() => {
        const fetchItems = async () => {
            const words = await axios(
                `https://random-word-api.herokuapp.com//word?number=${amountOfWords}&swear=0`
            );
            setAllData(words.data.map(word => { return { text: word } }));
        }
        fetchItems();
    }, [timesRestarted]);

    useEffect(() => {
        if (!gameStarted || nextWordIndex >= allData.length)
            return;
        const addWord = () => {
            setActiveWords((prev) => [...prev, { ...allData[nextWordIndex], speed: baseGameSpeed + Math.random() * speedModifier, key: nextWordIndex }]);
            setNextWordIndex(prev => prev + 1);
        }
        const interval = setInterval(() => {
            if (nextWordIndex < allData.length)
                addWord();
            else
                clearInterval(interval);
        }, 3000);
        return () => clearInterval(interval);
    }, [gameStarted, allData, nextWordIndex]);

    const all_pieces = activeWords.map((data) =>
        <GamePiece key={data.key} text={data.text} speed={data.speed} removeWord={() => removeWord(data.text)} reduceLife={reduceLife} />
    )
    const checkWord = (e) => {
        const currentInput = e.target.value;
        // TODO: consider using dictionary instead of array for more efficient search
        if (activeWords.filter(data => data.text === currentInput).length > 0) {
            addToScore(10);
            setInput('');
            // Destroy word - user already wrote it
            removeWord(currentInput);
        }
        else
            setInput(currentInput);
    }
    const handleClick = () => {
        if (!gameStarted) {
            setGameStarted(true);
            setScore(0);
            setNextWordIndex(0);
            setLives(startLife);
        }
        else {
            restartGame();
        }
    }
    return (
        <>
            <div>
                <p>Number of Words: {nextWordIndex}/{amountOfWords}</p>
                <p>Number of Lives: {lives}</p>
                <p style={{ color: "red" }}>{!gameStarted && timesRestarted > 0 ? 'Game Over' : null}</p>
            </div>
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
