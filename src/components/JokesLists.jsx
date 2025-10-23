import { JokeList } from "./JokeList.jsx";
import "./JokesList.css";

export const JokesLists = ({ toldJokes, untoldJokes, onDelete, onToggle }) => (
  <div className="joke-lists-container">
    <JokeList
      title="Told Jokes"
      jokes={toldJokes}
      onDelete={onDelete}
      onToggleStatus={onToggle}
      label="told"
      toggleLabel="Mark Untold"
    />
    <JokeList
      title="Untold Jokes"
      jokes={untoldJokes}
      onDelete={onDelete}
      onToggleStatus={onToggle}
      label="untold"
      toggleLabel="Mark Told"
    />
  </div>
);
