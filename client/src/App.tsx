import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Note from "./components/note/Note";
import { Note as NoteModel } from "./models/notes";
import * as NotesApi from "./network/notes_api";
import styles from "./styles/NotesPage.module.css";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes()
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((element, index) => {
          return (
            <Col key={element._id}>
              <Note note={element} className={styles.note} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default App;
