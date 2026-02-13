import React, { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import "./App.css";

// UPDATE THIS URL to match the "Domain" shown in your Vercel Backend Dashboard
const BASE_URL = "https://sticky-wall-liard.vercel.app/api/notes";

function App() {
  const [notes, setNotes] = useState([]);

  // Fetch all notes
  useEffect(() => {
    axios.get(BASE_URL)
      .then(res => {
        // Ensure res.data is an array before setting state
        setNotes(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => console.error("Error fetching notes:", err));
  }, []);

  // Add a new note
  function addNote(newNote) {
    axios.post(BASE_URL, {
      text: newNote.content,
      color: newNote.color
    })
    .then(res => {
      setNotes(prevNotes => [res.data, ...prevNotes]); 
    })
    .catch(err => console.error("Error adding note:", err));
  }

  // Delete a note
  function deleteNote(id) {
    axios.delete(`${BASE_URL}/${id}`)
      .then(() => {
        setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
      })
      .catch(err => console.error("Error deleting note:", err));
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Sticky Wall</h1>
      </div>
      <CreateArea onAdd={addNote} />
      <div className="note-container">
        {notes.length > 0 ? (
          notes.map((noteItem) => (
            <Note
              key={noteItem._id}
              id={noteItem._id}
              content={noteItem.text}
              color={noteItem.color}
              onDelete={deleteNote}
            />
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%", marginTop: "20px" }}>
            No notes found. Try adding one!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;