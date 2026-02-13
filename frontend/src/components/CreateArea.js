import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    content: "",
    color: "#ffeb3b" // Default yellow
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => {
      return { ...prevNote, [name]: value };
    });
  }

  function submitNote(event) {
    props.onAdd(note); // Sends data to App.js
    setNote({ content: "", color: "#ffeb3b" }); // Reset form
    event.preventDefault();
  }

  return (
    <div className="create-area">
      <form>
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Write a note..."
          rows="3"
        />
        <div className="color-picker">
            <span onClick={() => setNote({...note, color: "#ffeb3b"})} style={{background:"#ffeb3b"}}></span>
            <span onClick={() => setNote({...note, color: "#ff7eb9"})} style={{background:"#ff7eb9"}}></span>
            <span onClick={() => setNote({...note, color: "#7afcff"})} style={{background:"#7afcff"}}></span>
        </div>
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;