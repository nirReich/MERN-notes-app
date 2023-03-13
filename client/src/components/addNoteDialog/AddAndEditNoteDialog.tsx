import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Note } from "../../models/notes";
import { NoteInput } from "../../network/notes_api";
import * as NotesApi from "../../network/notes_api";
import TextInputField from "../form/TextInputField";

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
          <TextInputField 
          name="title"
          label="Title"
          type="text"
          placeholder="Title"
          register={register}
          registerOptions={{required: "Required"}}
          error={errors.title}
          />
          <TextInputField 
          name="text"
          label="Text"
          as="textarea"
          rows={5}
          placeholder="Note text"
          register={register}
          />

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
