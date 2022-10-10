import React, { useEffect, useState } from "react";
import NoteContainer from "./Components/NoteContainer/NoteContainer";
import "./App.css";
import "./Components/Note/Note.css";
import Sidebar from "./Components/Sidebar/Sidebar";
function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes-app")) || []
  );

  const addNote = (color) => {
    const tempNotes = [...notes];
    tempNotes.push({
      id: Date.now() + "" + Math.floor(Math.random() * 78),
      text: "",
      time: Date.now(),
      color,
    });
    setNotes(tempNotes);
  };
  const deleteNote = (id) => {
    const tempNote = [...notes];
    const index = tempNote.findIndex((item) => item.id === id);
    if (index < 0) return;
    tempNote.splice(index, 1);
    setNotes(tempNote);
  };

  const updateText = (text, id) => {
    const tempNote = [...notes];
    const index = tempNote.findIndex((item) => item.id === id);
    if (index < 0) return;
    tempNote[index].text = text;
    setNotes(tempNote);
  };

  useEffect(() => {
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="App">
      <Sidebar addNote={addNote} />
      <NoteContainer
        notes={notes}
        deleteNote={deleteNote}
        updateText={updateText}
      />
    </div>
  );
}

export default App;
