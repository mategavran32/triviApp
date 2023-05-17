import React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Trivia from "./Trivia";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { trackPromise } from "react-promise-tracker";
import "./styles/Home.css";
import Button from "./Button";
function Home() {
  const [data, setData] = useState(null);
  const [number, setNumber] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const [difficulty, setDifficulty] = useState("Any");
  const [category, setCategory] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputLength, setInputLength] = useState(0);
  const gameDiv = useRef(null);
  const firstUpdate = useRef(true);
  const options = ["Any", "Easy", "Medium", "Hard"];
  const defaultOption = options[0];
  const categories = [
    "Any",
    "General knowledge",
    "Books",
    "Film",
    "Music",
    "Music & Theater",
    "Televison",
    "Video Games",
    "Board Games",
    "Science & Nature",
    "Computers",
    "Mathematics",
    "Mythology",
    "Sports",
    "Geography",
    "History",
    "Politics",
    "Art",
    "Celebrities",
    "Animals",
  ];
  const hideDiv = () => {
    gameDiv.current.style.display = "none";
  };
  const defaulCategory = categories[0];

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    let url = "";

    const dataFetch = async () => {
      if (difficulty === "Any" && category === "Any") {
        url = `https://opentdb.com/api.php?amount=${trigger}`;
      } else if (difficulty === "Any") {
        url = `https://opentdb.com/api.php?amount=${trigger}&category=${category}`;
      } else if (category === "Any") {
        url = `https://opentdb.com/api.php?amount=${trigger}&difficulty=${difficulty.toLocaleLowerCase()}`;
      } else {
        url = `https://opentdb.com/api.php?amount=${trigger}&category=${category}&difficulty=${difficulty.toLocaleLowerCase()}`;
      }
      const data = await (await fetch(url)).json();

      setData(data);
    };
    trackPromise(dataFetch(trigger));
  }, [trigger]);
  useEffect(() => {
    if (inputLength === 0 || number > 50) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [number]);
  return (
    <div className="gameDiv">
      {data ? (
        <Trivia data={data} number={number} />
      ) : (
        <div ref={gameDiv} className="gameDiv">
          <p className="numberRound">Number Of Rounds</p>
          <input
            type="number"
            onChange={(e) => {
              setNumber(e.target.value);
              setInputLength(e.target.value.trim().length);
            }}
          ></input>
          <p className="diffP">Difficulty</p>
          <Dropdown
            options={options}
            value={defaultOption}
            onChange={(e) => setDifficulty(e.value)}
            placeholder="Select difficulty"
            className="dropdown"
          />
          <p className="catP">Category</p>
          <Dropdown
            options={categories}
            value={defaulCategory}
            placeholder="Select category"
            onChange={(e) => setCategory(categories.indexOf(e.value) + 8)}
          />

          <button
            disabled={isDisabled}
            className="button"
            onClick={() => {
              setTrigger(number);
              hideDiv();
            }}
          >
            Start
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
