import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NoteModel from "../models/note";
import { assertIsDefined } from "../utils/assertIsDefined";

export const getNotes: RequestHandler = async (req, res, next) => {
  const authUserId = req.session.userId;
  try {
    assertIsDefined(authUserId)
    const notes = await NoteModel.find({userId: authUserId}).exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getSingleNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  const authUserId = req.session.userId;
  try {
    assertIsDefined(authUserId)
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note Id");
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    if (!note.userId.equals(authUserId)){
      throw createHttpError(401,"You cannot access this note!")
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const crateNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  const authUserId = req.session.userId;
  try {
    assertIsDefined(authUserId)

    if (!title) {
      throw createHttpError(400, "Note must have a title!");
    }
    const newNote = await NoteModel.create({
      userId: authUserId,
      title,
      text,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;
  const authUserId = req.session.userId;
  try {
    assertIsDefined(authUserId)
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note Id");
    }
    if (!newTitle) {
      throw createHttpError(400, "Note must have a title!");
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    if (!note.userId.equals(authUserId)){
      throw createHttpError(401,"You cannot update this note!")
    }
    note.title = newTitle;
    note.text = newText;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  const authUserId = req.session.userId;
  try {
    assertIsDefined(authUserId)
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note Id");
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    if (!note.userId.equals(authUserId)){
      throw createHttpError(401,"You cannot delete this note!")
    }

    await NoteModel.deleteOne({ _id: noteId });
    res.sendStatus(204)
  } catch (error) {
    next(error);
  }
};

interface UpdateNoteParams {
  noteId: string;
}

interface CreateNoteBody {
  title?: string;
  text?: string;
}

interface UpdateNoteBody {
  title?: string;
  text?: string;
}
