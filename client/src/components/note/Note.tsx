import React from "react";
import styles from "./Note.module.css";
import { Note as NoteModel } from "../../models/notes";
import { Card } from "react-bootstrap";

type Props = {
  note: NoteModel;
  className?: string;
};

function Note({ note, className }: Props) {
  const { title, text, createdAt, updatedAt } = note;

  const handleNoteDate = (created: string, updated: string): string => {
    if (updated > created) {
      return `Updated at : ${updated}`;
    }
    return `Created at : ${created}`;
  };

  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{handleNoteDate(createdAt,updatedAt)}</Card.Footer>
    </Card>
  );
}

export default Note;
