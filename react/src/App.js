import "./styles.css";
import { useEffect, useState } from "react";
import { Note } from "./Note.js";
import { create as createNote, getAll as getAllNotes } from "./services/notes";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("useEffect");
    setLoading(true);
    getAllNotes().then((notes) => {
      setNotes(notes);
      setLoading(false);
    });

    return () => {
      console.log("removeEffect");
    };
  }, []);

  useEffect(() => {
    console.log("efecto 2");
  }, [newNote]);

  useEffect(() => {
    console.log("efecto 3");
  }, []);

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const noteToAddToState = {
      title: newNote,
      body: newNote,
      userId: 1
    };

    setError("");

    createNote(noteToAddToState)
      .then((newNote) => {
        setNotes((prevNotes) => prevNotes.concat(newNote));
      })
      .catch((error) => {
        console.error(error);
      });

    setNotes([]);
    setNewNote("");
  };

  console.log("render");

  return (
    <div>
      <h1>Notes</h1>
      {loading ? "Cargando..." : ""}
      <ol>
        {notes.map((note) => (
          <Note 
            key={note.id} 
            note={note}  
          />
        ))}
      </ol>

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote} />
        <button>Crear nota</button>
      </form>

      {error ? <span style={{ color: "red" }}>{error}</span> : ""}
    </div>
  );
}
