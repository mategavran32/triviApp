import React, { useState } from "react";
import Question from "./Question";
import "./styles/Questions.css";
function Trivia({ data, number }) {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const allData = data.results;
  const handleNewGame = () => {
    window.location.reload();
  };
  return (
    <div className="triviaDiv">
      {currentQuestion >= number ? (
        <div>
          <h1>Game Over</h1>
          <p>Final score: {score}</p>
          <p>Rounds played: {currentQuestion}</p>
          <button onClick={handleNewGame}>New Game</button>
        </div>
      ) : (
        <div className="gameDiv">
          <div className="scoreDiv">Score: {score}</div>
          <div className="roundDiv">Round: {currentQuestion}</div>
          <Question
            allData={allData[currentQuestion]}
            setScore={setScore}
            setCurrent={setCurrentQuestion}
          />
        </div>
      )}
    </div>
  );
}

export default Trivia;
