import React from "react";
import styles from "./Note.module.css";
import styleUtils from "../../styles/utils.module.css";
import { Note as NoteModel } from "../../models/notes";
import { Card } from "react-bootstrap";
import { MdDelete } from "react-icons/md";

type Props = {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClick: (note: NoteModel) => void;
  className?: string;
};

function Note({ note, className, onDeleteNoteClick, onNoteClicked }: Props) {
  const { title, text, createdAt, updatedAt } = note;

  const handleNoteDate = (created: string, updated: string): string => {
    if (updated > created) {
      return `Updated at : ${updated}`;
    }
    return `Created at : ${created}`;
  };

  return (
    <Card
      className={`${styles.noteCard} ${className}`}
      onClick={()=>onNoteClicked(note)}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              onDeleteNoteClick(note);
              e.stopPropagation(); // make it possible to click on the icon without open the update note logic
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        {handleNoteDate(createdAt, updatedAt)}
      </Card.Footer>
    </Card>
  );
}

export default Note;
