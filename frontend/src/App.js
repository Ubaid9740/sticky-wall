import React, { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  
  useEffect(() => {
    axios.get("https://sticky-wall-api.vercel.app/api/notes")
      .then(res => setNotes(res.data))
      .catch(err => console.log(err));
  }, []);

  
  function addNote(newNote) {
    axios.post("https://sticky-wall-api.vercel.app/api/notes", {
      text: newNote.content,
      color: newNote.color
    })
    .then(res => {
      setNotes(prevNotes => [res.data, ...prevNotes]); // Add new note to screen
    })
    .catch(err => console.log(err));
  }

  
  function deleteNote(id) {
    axios.delete(`https://sticky-wall-api.vercel.app/api/notes/${id}`)
      .then(() => {
        setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Sticky Wall</h1>
      </div>
      <CreateArea onAdd={addNote} />
      <div className="note-container">
        {notes.map((noteItem) => {
          return (
            <Note
              key={noteItem._id}
              id={noteItem._id}
              content={noteItem.text}
              color={noteItem.color}
              onDelete={deleteNote}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;