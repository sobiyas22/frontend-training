import type { Note } from "../types";
import { NoteItemComponent } from "./NoteItemComponent";

export type NoteListProps = {
  notes: Note[];
};

export function NoteListComponent(props: NoteListProps): HTMLElement {
  const { notes } = props;

  const root = document.createElement("div");
  root.className = "list";

  if (notes.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No notes yet. Create your first note.";
    root.append(empty);
    return root;
  }

  for (const note of notes) {
    root.append(NoteItemComponent({ note }));
  }

  return root;
}

