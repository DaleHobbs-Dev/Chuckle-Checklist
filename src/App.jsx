import { useState } from "react";
import { postNewJoke } from "./services/jokeService.js";
import "./App.scss";
import stevePic from "./assets/steve.png";

export const App = () => {
  const [inputJoke, setInputJoke] = useState("");

  const handleAddJoke = async () => {
    if (inputJoke.trim() === "") return;
    await postNewJoke(inputJoke);
    setInputJoke("");
  };

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
    </div>
  );
};
