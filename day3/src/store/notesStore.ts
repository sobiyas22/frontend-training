import type { Note, NoteId } from "../types";

const STORAGE_KEY = "day3_notes_spa_v1";

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function loadFromStorage(): Note[] {
  const raw = safeJsonParse<Note[]>(localStorage.getItem(STORAGE_KEY));
  if (!raw) return [];

  // minimal validation / normalization
  return raw
    .filter(
      (n) =>
        typeof n?.id === "string" &&
        typeof n?.title === "string" &&
        typeof n?.content === "string" &&
        typeof n?.createdAt === "number"
    )
    .map((n) => ({
      id: n.id,
      title: n.title,
      content: n.content,
      createdAt: n.createdAt
    }));
}

function saveToStorage(notes: Note[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function makeId(): NoteId {
  // good enough for in-browser demo; avoids long hashes
  return `n_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

let notes: Note[] = [];

export function initNotesStore() {
  notes = loadFromStorage();

  // seed with a friendly example for first run
  if (notes.length === 0) {
    const now = Date.now();
    notes = [
      {
        id: makeId(),
        title: "Welcome",
        content:
          "Create a note from the Create page.\n\nThis is a vanilla TypeScript SPA using components + client-side routing.",
        createdAt: now
      }
    ];
    saveToStorage(notes);
  }
}

export function listNotes(): Note[] {
  return [...notes].sort((a, b) => b.createdAt - a.createdAt);
}

export function getNote(id: NoteId): Note | undefined {
  return notes.find((n) => n.id === id);
}

export function addNote(input: Pick<Note, "title" | "content">): Note {
  const note: Note = {
    id: makeId(),
    title: input.title.trim(),
    content: input.content.trim(),
    createdAt: Date.now()
  };
  notes = [note, ...notes];
  saveToStorage(notes);
  return note;
}

export function deleteNote(id: NoteId): boolean {
  const before = notes.length;
  notes = notes.filter((n) => n.id !== id);
  if (notes.length === before) return false;
  saveToStorage(notes);
  return true;
}

