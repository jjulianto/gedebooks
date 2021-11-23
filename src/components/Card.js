import { Fragment } from "react";

const Card = (props) => {
  return (
    <Fragment>
      <div className="card">
        <div className="card-text">
          <p className="card-title">{props.book.title}</p>
          <p className="card-subtitle">
            {props.book.author} - {props.book.month}, {props.book.year}
          </p>
        </div>
        <div className="card-button">
          <button
            className="btn-edit"
            onClick={() => props.updateBook(props.book)}
          >
            Edit
          </button>
          <button
            className="btn-delete"
            onClick={() => props.deleteBook(props.book.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Card;
