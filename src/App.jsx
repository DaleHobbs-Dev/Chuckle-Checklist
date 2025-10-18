import { useEffect, useState } from "react";
import {
  postNewJoke,
  fetchAllJokes,
  changeToldStatus,
  deleteJoke,
} from "./services/jokeService.js";
// import "./App.scss";
import "./App.css";
import stevePic from "./assets/steve.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const App = () => {
  const [inputJoke, setInputJoke] = useState("");
  const [allJokes, setAllJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);

  const handleAddJoke = async () => {
    if (inputJoke.trim() === "") return;
    await postNewJoke(inputJoke);

    // Re-fetch all jokes after adding a new one
    const updatedJokes = await fetchAllJokes();
    setAllJokes(updatedJokes);

    setInputJoke("");
  };

  const handleJokeDeletion = async (joke) => {
    await deleteJoke(joke);
    const updatedJokes = await fetchAllJokes();
    setAllJokes(updatedJokes);
  };

  const handleChangeToldStatus = async (joke) => {
    await changeToldStatus(joke);
    const updatedJokes = await fetchAllJokes();
    setAllJokes(updatedJokes);
  };

  // Fetch all jokes on component mount. Prevents infinite loop by not including allJokes in dependency array.
  useEffect(() => {
    fetchAllJokes().then((jokes) => {
      setAllJokes(jokes);
      console.log("Fetched Jokes:", jokes);
    });
  }, []);

  useEffect(() => {
    const told = allJokes.filter((joke) => joke.told === true);
    const untold = allJokes.filter((joke) => joke.told === false);
    setToldJokes(told);
    setUntoldJokes(untold);
  }, [allJokes]);

  return (
    <div className="app-container">
      <div className="app-heading">
        <h1 className="app-heading-text">Chuckle Checklist</h1>
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
      </div>

      <h2>Add Joke</h2>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          placeholder="New One Liner"
          value={inputJoke}
          onChange={(event) => setInputJoke(event.target.value)}
        />
        <button className="joke-input-submit" onClick={handleAddJoke}>
          Add Joke
        </button>
      </div>
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>
            Told Jokes <span className="told-count">{toldJokes.length}</span>
          </h2>
          <ul>
            {toldJokes.map((joke) => (
              <li className="joke-list-item" key={joke.id}>
                <p className="joke-list-item-text">{joke.text}</p>{" "}
                <div className="joke-list-action-delete">
                  <button
                    onClick={() => handleJokeDeletion(joke)}
                    title="Delete Joke"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
                <div className="joke-list-action-toggle">
                  <button onClick={() => handleChangeToldStatus(joke)}>
                    Mark Untold
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="joke-list-container">
          <h2>
            Untold Jokes{" "}
            <span className="untold-count">{untoldJokes.length}</span>
          </h2>
          <ul>
            {untoldJokes.map((joke) => (
              <li className="joke-list-item" key={joke.id}>
                <p className="joke-list-item-text">{joke.text}</p>{" "}
                <div className="joke-list-action-delete">
                  <button
                    onClick={() => handleJokeDeletion(joke)}
                    title="Delete Joke"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
                <div className="joke-list-action-toggle">
                  <button onClick={() => handleChangeToldStatus(joke)}>
                    Mark Told
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
