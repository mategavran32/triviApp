import React from "react";
import "./styles/Questions.css";
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
  return (
    <div>
      <h2>
        Category: <p>{allData.category}</p>
      </h2>
      <p>Difficulty: {allData.difficulty}</p>
      <p>
        Question:
        <p>{allData.question}</p>
      </p>
      {allData.type === "multiple" ? (
        <div className="buttonsDiv">
          <button onClick={() => checkCorrect(randArr[0])}>{randArr[0]}</button>
          <button onClick={() => checkCorrect(randArr[1])}>{randArr[1]}</button>
          <button onClick={() => checkCorrect(randArr[2])}>{randArr[2]}</button>
          <button onClick={() => checkCorrect(randArr[3])}>{randArr[3]}</button>
        </div>
      ) : (
        <div className="buttonsDiv">
          <button onClick={() => checkCorrect(randArr[0])}>{randArr[0]}</button>
          <button onClick={() => checkCorrect(randArr[1])}>{randArr[1]}</button>
        </div>
      )}
    </div>
  );
}

export default Question;
