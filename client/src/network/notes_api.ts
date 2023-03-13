import { Note } from "../models/notes";
import { User } from "../models/user";

export interface NoteInput {
  title: string;
  text?: string;
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export interface loginCredentials {
  username: string;
  password: string;
}

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);
  if (res.ok) {
    return res;
  } else {
    const errorBody = await res.json();
    const errMsg = errorBody.error;
    throw Error(errMsg);
  }
}

export async function getLoggedInUser(): Promise<User> {
  const res = await fetchData("/api/users", { method: "GET" });
  return res.json();
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const res = await fetchData("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

export async function login(credentials: loginCredentials): Promise<User> {
  const res = await fetchData("/api/users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

export async function logout(): Promise<void> {
  await fetchData("/api/users/logout", { method: "POST" });
}

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetchData("/api/notes", {
    method: "GET",
  });
  return await res.json();
}

export async function createNote(note: NoteInput): Promise<Note> {
  const res = await fetchData("api/notes", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return res.json();
}

export async function updateNote(
  noteId: string,
  noteInput: NoteInput
): Promise<Note> {
  const res = await fetchData(`api/notes/${noteId}`, {
    method: "PATCH",

    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(noteInput),
  });
  return res.json();
}

export async function deleteNote(noteId: string) {
  await fetchData(`api/notes${noteId}`, { method: "DELETE" });
}
