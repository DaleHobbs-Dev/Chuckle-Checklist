import { JokeList } from "./JokeList";

export const JokesLists = ({ toldJokes, untoldJokes, onDelete, onToggle }) => (
  <div className="joke-lists-container">
    <JokeList
      title="Told Jokes"
      jokes={toldJokes}
      onDelete={onDelete}
      onToggleStatus={onToggle}
      toggleLabel="Mark Untold"
    />
    <JokeList
      title="Untold Jokes"
      jokes={untoldJokes}
      onDelete={onDelete}
      onToggleStatus={onToggle}
      toggleLabel="Mark Told"
    />
  </div>
);
