import React, { useEffect } from 'react'

function Settings({ settings }) {
    const [speed, setSpeed] = settings.speed;
    const [numberOfWords, setNumberOfWords] = settings.numberOfWords;
    const [randomColors, setRandomColors] = settings.randomColors;

    useEffect(() => {
        if (localStorage.getItem("speed") !== undefined && localStorage.getItem("speed") !== null) {
            setSpeed(localStorage.getItem("speed"));
        }
        if (localStorage.getItem("numberOfWords") !== undefined && localStorage.getItem("numberOfWords") !== null) {
            setNumberOfWords(localStorage.getItem("numberOfWords"));
        }
        if (localStorage.getItem("randomColors") !== undefined && localStorage.getItem("randomColors") !== null) {
            setRandomColors(localStorage.getItem("randomColors") === 'true');
        }
    }, [setSpeed, setNumberOfWords, setRandomColors]);

    var Submit = (e) => {
        e.preventDefault();

        localStorage.setItem('speed', speed);
        localStorage.setItem('numberOfWords', numberOfWords);
        localStorage.setItem('randomColors', randomColors);
        alert("New Settings Saved!");
    }
    return (
        <div>
            <h1>Settings</h1>
            <form >
                <label>Speed (between 1 and 10):</label>
                <input onChange={e => setSpeed(e.target.value)} type="number" id="speed" name="speed" min="1" max="10" value={speed} />
                <br></br>
                <label>Amount Of Words (Empty is infinite):</label>
                <input onChange={e => setNumberOfWords(e.target.value)} type="number" id="amount_of_words" name="amount_of_words" min="1" value={numberOfWords} />
                <br></br>
                <label>Random Colors</label>
                <input onChange={() => setRandomColors(prev => !prev)} type="checkbox" id="random_colors" name="random_colors" checked={randomColors} />
                <br></br>
                <input type="submit" onClick={Submit} />
            </form>
        </div>
    )
}

export default Settings
