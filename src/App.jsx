import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [playername, setplayername] = useState("");
  const [tenzies, setTenzies] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [dice, setDice] = useState(allNewDice());
  const [gameStarted, setGameStarted] = useState(false);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: Math.random(),
    };
  }
  function allNewDice() {
    const newDie = [];
    for (let i = 0; i < 10; i++) {
      newDie.push(generateNewDie());
    }
    return newDie;
  }

  function startGame() {
    if (playername) {
      setGameStarted(true);
      setDice(allNewDice());
      setRollCount(0);
      setTenzies(false);
    }
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      setRollCount((prevcount) => prevcount + 1);
    }
  }

  function holdDie(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);

    const first = dice[0].value;
    const allSame = dice.every((die) => die.value === first);

    if (allHeld && allSame) {
      setTenzies(true);
    }
  }, [dice]);

  function newGame() {
    setTenzies(false);
    setDice(allNewDice());
    setRollCount(0);
  }

  function back() {
    setplayername("");
    setGameStarted(false);
    setTenzies(false);
    setDice(allNewDice());
    setRollCount(0);
  }

  if (!gameStarted) {
    return (
      <div className="main-container">
        <h1 className="heading">Tenzies 🎲</h1>
        <p className="intro">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls. Try to get the fastest time!
        </p>

        <input
          className="input"
          type="text"
          placeholder="Enter your Name"
          value={playername}
          onChange={(e) => setplayername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              startGame();
            }
          }}
        />

        <button onClick={startGame} className="startbtn">
          Start
        </button>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="header">
        <h2 className="playername">Hello {playername}</h2>
        <button className="backbtn" onClick={back}>
          {" "}
          ← Back
        </button>
      </div>

      {tenzies && (
        <div className="win-container">
          <h2 className="win-heading">🎉 You won! 🎉</h2>
          <p className="win-text">
            Congratulations {playername}! You got Tenzies in {rollCount} rolls!
          </p>
        </div>
      )}

      <div className="rollcounter-box">
        <div className="rollcount">{rollCount}</div>
        <div className="Roll-number">Number of rolls</div>
      </div>

      <div className="die-box">
        {dice.map((die) => (
          <div
            key={die.id}
            onClick={() => holdDie(die.id)}
            className={`die ${die.isHeld ? "is-held" : ""}`}
          >
            {die.value}
          </div>
        ))}
      </div>

      {tenzies ? (
        <button onClick={newGame} className="newGamebtn">
          Play Again
        </button>
      ) : (
        <button className="rolldice" onClick={rollDice}>
          🎲Roll Dice
        </button>
      )}

      <p className="instructions">
        💡 Click on dice to hold them (they'll turn green), then roll the
        others!
      </p>
    </div>
  );
}

export default App;
