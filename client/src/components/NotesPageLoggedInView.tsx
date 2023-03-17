import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { Note as NoteModel } from "../models/notes";
import * as NotesApi from "../network/notes_api";
import AddAndEditNoteDialog from './AddAndEditNoteDialog';
import Note from './note/Note';
import styles from "../styles/NotesPage.module.css";
import styleUtils from "../styles/utils.module.css";

function NotesPageLoggedInView() {
    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
    const [notesLoading, setNotesLoading] = useState(true);
    const [showNotesLoadError, setShowNotesLoadError] = useState(false);

    useEffect(() => {
        async function loadNotes() {
          try {
            setShowNotesLoadError(false);
            setNotesLoading(true);
            const notes = await NotesApi.fetchNotes();
            setNotes(notes);
          } catch (error) {
            console.error(error);
            setShowNotesLoadError(true);
          } finally {
            setNotesLoading(false);
          }
        }
        loadNotes();
      }, []);
    

    const deleteNote = async (note: NoteModel) => {
        try {
          await NotesApi.deleteNote(note._id);
          setNotes(notes.filter((excitingNote) => excitingNote._id !== note._id));
        } catch (error) {
          console.error(error);
          alert(error);
        }
      };

    const notesGrid = (
        <Row xs={1} md={2} xl={3} className = {`g-4 ${styles.notesGrid}`}>
          {notes.map((element, index) => {
            return (
              <Col key={element._id}>
                <Note
                  note={element}
                  className={styles.note}
                  onNoteClicked={setNoteToEdit}
                  onDeleteNoteClick={deleteNote}
                />
              </Col>
            );
          })}
        </Row>
      );
  return (
    <>
    <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowAddModal(true)}
      >
        <FaPlus />
        Add New Note
      </Button>

      {notesLoading && <Spinner animation="border" variant="primary"/> }
      {showNotesLoadError && <p>Something went wrong!</p>}
      {!notesLoading && !showNotesLoadError && 
      <>
        {
          notes.length > 0 ? notesGrid : <p className={`${styleUtils.whiteText}`}>You don't have any notes yet!</p>
        }
      </>
      }

      {showAddModal && (
        <AddAndEditNoteDialog
          onDismiss={() => setShowAddModal(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddModal(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddAndEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => {
            setNoteToEdit(null);
          }}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </>
  )
}

export default NotesPageLoggedInView