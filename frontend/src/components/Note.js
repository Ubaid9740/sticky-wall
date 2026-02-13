import React from "react";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id); // Triggers the delete function in App.js
  }

  return (
    <div className="note" style={{ backgroundColor: props.color }}>
      <p>{props.content}</p>
      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

export default Note;