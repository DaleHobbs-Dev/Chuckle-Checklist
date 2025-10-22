import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export const JokeList = ({
  title,
  jokes,
  onDelete,
  onToggleStatus,
  toggleLabel,
}) => {
  return (
    <div className="joke-list-container">
      <h2>
        {title} <span className="joke-count">{jokes.length}</span>
      </h2>
      <ul>
        {jokes.map((joke) => (
          <li className="joke-list-item" key={joke.id}>
            <p className="joke-list-item-text">{joke.text}</p>
            <div className="joke-list-action-delete">
              <button onClick={() => onDelete(joke)} title="Delete Joke">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <div className="joke-list-action-toggle">
              <button onClick={() => onToggleStatus(joke)}>
                {toggleLabel}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

JokeList.propTypes = {
  title: PropTypes.string.isRequired,
  jokes: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleStatus: PropTypes.func.isRequired,
  toggleLabel: PropTypes.string.isRequired,
};
