import React, { useState, useEffect } from 'react'
import './GameBoard.css'
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import GamePiece from './GamePiece';
import axios from 'axios';

const startLife = 3;
const speedModifier = 5;

const RandomColors = ["red", "green", "yellow", "blue", "black", "white"];

function GameBoard({ score, setScore, settings }) {
    const [gameStarted, setGameStarted] = useState(false);
    const [input, setInput] = useState('');
    const [activeWords, setActiveWords] = useState([]);
    const [allData, setAllData] = useState([]);
    const [timesRestarted, setTimesRestarted] = useState(0);
    const [lives, setLives] = useState(startLife);
    const [nextWordIndex, setNextWordIndex] = useState(0);
    const [name, setName] = useState('player');
    const [color, setColor] = useState("black")

    var amountOfWords = settings.numberOfWords[0];
    const baseGameSpeed = settings.speed[0];
    const randomColors = settings.randomColors[0];

    if (amountOfWords === "")
        amountOfWords = 10000

    const saveScore = (name, score) => {
        let previousScores = localStorage.getItem('scores');
        previousScores = previousScores ? JSON.parse(previousScores) : [];
        localStorage.setItem('scores', JSON.stringify([...previousScores, { name, score }]));
    }

    const chooseRandomColor = () => {
        if (randomColors === false)
            setColor("white");
        else
            setColor(String(RandomColors[Math.round(Math.random() * RandomColors.length)]));
    }
    const restartGame = () => {
        setGameStarted(false);
        setActiveWords([]);
        setInput('');
        setTimesRestarted(prev => prev + 1);
        saveScore(name, score);
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
    }, [timesRestarted, amountOfWords]);

    useEffect(() => {
        if (!gameStarted || nextWordIndex >= allData.length)
            return;
        const addWord = () => {
            setActiveWords((prev) => [...prev, { ...allData[nextWordIndex], speed: baseGameSpeed + Math.random() * speedModifier, key: nextWordIndex }]);
            setNextWordIndex(prev => prev + 1);
        }
        const interval = setInterval(() => {
            chooseRandomColor();
            if (nextWordIndex < allData.length)
                addWord();
            else
                clearInterval(interval);
        }, 3000);
        return () => clearInterval(interval);
    }, [gameStarted, allData, nextWordIndex, baseGameSpeed]);


    const all_pieces = activeWords.map((data) =>
        <GamePiece color={color} text={data.text} speed={data.speed} removeWord={() => removeWord(data.text)} reduceLife={reduceLife} />
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
    const renderNameInput = () => {
        return (
            <>
                <Input className="username_input" value={name} onChange={(e => setName(e.target.value))} placeholder="Enter your name" />
                <br />
            </>
        )
    }

    if (amountOfWords === 10000)
        var lineOfNumberOfWords = nextWordIndex
    else
        lineOfNumberOfWords = nextWordIndex + "/" + amountOfWords

    return (
        <>
            <div>
                <p>Number of Words: {lineOfNumberOfWords}</p>
                <p>Number of Lives: {lives}</p>
                <p style={{ color: "red" }}>{!gameStarted && timesRestarted > 0 ? 'Game Over' : null}</p>
            </div>
            <div className="gameBoard">
                {all_pieces}
            </div>
            <div className="buttonsRow">
                {!gameStarted ? renderNameInput() : null}
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