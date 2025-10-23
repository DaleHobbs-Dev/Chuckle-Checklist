import { useEffect, useState } from "react";
import {
  fetchAllJokes,
  changeToldStatus,
  deleteJoke,
} from "./services/jokeService.js";
import "./App.css";
import { AppHeader } from "./components/AppHeader.jsx";
import { JokeInput } from "./components/JokeInput.jsx";
import { JokesLists } from "./components/JokesLists.jsx";

export const App = () => {
  const [allJokes, setAllJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);

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
      <AppHeader />
      <JokeInput
        onJokeAdded={async () => {
          const updatedJokes = await fetchAllJokes();
          setAllJokes(updatedJokes);
        }}
      />
      <JokesLists
        toldJokes={toldJokes}
        untoldJokes={untoldJokes}
        onDelete={handleJokeDeletion}
        onToggle={handleChangeToldStatus}
      />
    </div>
  );
};
