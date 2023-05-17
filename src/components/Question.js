import React from "react";
import "./styles/Questions.css";
import Button from "./Button";
function Question({ allData, setScore, setCurrent }) {
  let allAnswers = [...allData.incorrect_answers, allData.correct_answer];
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const randArr = shuffleArray(allAnswers);
  const checkCorrect = (answer) => {
    setCurrent((prev) => prev + 1);
    if (answer === allData.correct_answer) {
      setScore((prev) => prev + 1);
      return true;
    }
    return false;
  };
  const handleClick = (answer) => {
    checkCorrect(answer);
  };
  return (
    <div>
      <div className="quesDiv categDiv">
        <p>Category: {allData.category}</p>
      </div>
      <div className="difDiv">
        <p>Difficulty: {allData.difficulty}</p>
      </div>

      <div className="quesDiv">
        <p>Question: {allData.question}</p>
      </div>
      {allData.type === "multiple" ? (
        <div className="buttonsDiv">
          <Button rand={randArr[0]} handleClick={handleClick} />
          <Button rand={randArr[1]} handleClick={handleClick} />
          <Button rand={randArr[2]} handleClick={handleClick} />
          <Button rand={randArr[3]} handleClick={handleClick} />
        </div>
      ) : (
        <div className="buttonsDiv">
          <Button rand={randArr[0]} handleClick={handleClick} />
          <Button rand={randArr[1]} handleClick={handleClick} />
        </div>
      )}
    </div>
  );
}

export default Question;
