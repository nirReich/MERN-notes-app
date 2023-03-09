import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Note } from "../../models/notes";
import { NoteInput } from "../../network/notes_api";
import * as NotesApi from "../../network/notes_api";

type Props = {
  onDismiss: () => void;
  onNoteSaved: (note:Note)=>void
  noteToEdit?: Note
};

function AddAndEditNoteDialog({ onDismiss, onNoteSaved, noteToEdit }: Props) {

    const { register, handleSubmit, watch, formState: { errors, isSubmitting }  } = useForm<NoteInput>({
      defaultValues:{
        title:noteToEdit?.title || "",
        text: noteToEdit?.text || ""
      }
    })

    async function onSubmit(input:NoteInput) {
        try {
            let noteRes:Note;

            if (noteToEdit) {
              noteRes = await NotesApi.updateNote(noteToEdit._id, input)
            } else{
              noteRes = await NotesApi.createNote(input);
            }
            onNoteSaved(noteRes)
        } catch (error) {
            console.log(error);
            alert (error)
            
        }
    }


  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          {noteToEdit ? "Edit Note" : "Add Note"}
          </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Note Title</Form.Label>
            <Form.Control type="text" placeholder="Title" isInvalid={!!errors.title} {...register("title",{required:"required"})}/>
            <Form.Control.Feedback type="invalid">
                {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Note Text</Form.Label>
            <Form.Control as="textarea" rows={5} placeholder="Text" {...register("text")}/>
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="addEditNoteForm" disabled= {isSubmitting}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddAndEditNoteDialog;
