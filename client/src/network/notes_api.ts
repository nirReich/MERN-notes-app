import { Note } from "../models/notes";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);
  if (res.ok) {
    return res;
  } else {
    const errorBody = await res.json();
    const errMsg = errorBody.error;
    throw Error(errMsg)
  }
}

export async function fetchNotes(): Promise<Note[]> {
    const res = await fetchData("/api/notes", {
        method: "GET",
      });
      return await res.json();
}