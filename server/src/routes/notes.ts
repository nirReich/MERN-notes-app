import express from "express";
import * as NotesController from "../controllers/notes";

const router = express.Router();
router.get("/", NotesController.getNotes);
router.get("/:noteId", NotesController.getSingleNote)
router.post("/", NotesController.crateNote);
router.patch("/:noteId", NotesController.updateNote )
router.delete("/:noteId", NotesController.deleteNote)

export default router;
