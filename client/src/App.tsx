import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import AddNoteDialog from "./components/addNoteDialog/AddNoteDialog";
import Note from "./components/note/Note";
import { Note as NoteModel } from "./models/notes";
import * as NotesApi from "./network/notes_api";
import styles from "./styles/NotesPage.module.css";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
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
      <Button onClick={() => setShowAddModal(true)}>Add New Note</Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((element, index) => {
          return (
            <Col key={element._id}>
              <Note note={element} className={styles.note} />
            </Col>
          );
        })}
      </Row>
      {showAddModal && (
        <AddNoteDialog
          onDismiss={() => setShowAddModal(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddModal(false);
          }}
        />
      )}
    </Container>
  );
}

export default App;
