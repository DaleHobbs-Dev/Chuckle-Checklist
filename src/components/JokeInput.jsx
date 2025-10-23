import { useState } from "react";
import { postNewJoke } from "../services/jokeService";
import "./JokeInput.css";

export const JokeInput = ({ onJokeAdded }) => {
  const [inputJoke, setInputJoke] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddJoke = async () => {
    if (inputJoke.trim() === "") return;
    setLoading(true);
    try {
      await postNewJoke(inputJoke);
      onJokeAdded();
      setInputJoke("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Add Joke</h2>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          placeholder="New One Liner"
          value={inputJoke}
          onChange={(event) => setInputJoke(event.target.value)}
        />
        <button
          disabled={loading}
          className="joke-input-submit"
          onClick={handleAddJoke}
        >
          {loading ? "Adding..." : "Add Joke"}
        </button>
      </div>
    </>
  );
};
