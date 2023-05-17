import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import Trivia from "./components/Trivia";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { trackPromise } from "react-promise-tracker";

function App() {
  const [data, setData] = useState(null);
  const [number, setNumber] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const [difficulty, setDifficulty] = useState("Any");
  const [category, setCategory] = useState(0);
  const [url, setUrl] = useState();
  const gameDiv = useRef(null);
  const firstUpdate = useRef(true);
  const options = ["Any", "easy", "medium", "hard"];
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

  useLayoutEffect(() => {
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
        url = `https://opentdb.com/api.php?amount=${trigger}&difficulty=${difficulty}`;
      } else {
        url = `https://opentdb.com/api.php?amount=${trigger}&category=${category}&difficulty=${difficulty}`;
      }
      const data = await (await fetch(url)).json();

      setData(data);
    };
    trackPromise(dataFetch(trigger));
  }, [trigger]);
  return (
    <div className="App">
      {data ? (
        <Trivia data={data} number={number} />
      ) : (
        <div ref={gameDiv} className="gameDiv">
          <input
            type="number"
            placeholder="Number of rounds"
            onChange={(e) => setNumber(e.target.value)}
          ></input>
          <Dropdown
            options={options}
            value={defaultOption}
            onChange={(e) => setDifficulty(e.value)}
            placeholder="Select difficulty"
          />
          <Dropdown
            options={categories}
            value={defaulCategory}
            placeholder="Select category"
            onChange={(e) => setCategory(categories.indexOf(e.value) + 8)}
          />
          <button
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

export default App;
