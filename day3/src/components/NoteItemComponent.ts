import type { Note } from "../types";
import { formatTimestamp } from "../utils/format";

export type NoteItemProps = {
  note: Note;
};

export function NoteItemComponent(props: NoteItemProps): HTMLElement {
  const { note } = props;

  const a = document.createElement("a");
  a.className = "note";
  a.href = `/note/${encodeURIComponent(note.id)}`;
  a.setAttribute("data-link", "true");

  const left = document.createElement("div");
  left.className = "note__left";

  const title = document.createElement("h3");
  title.className = "note__title";
  title.textContent = note.title || "(Untitled)";

  const meta = document.createElement("div");
  meta.className = "note__meta";
  meta.textContent = formatTimestamp(note.createdAt);

  left.append(title, meta);
  a.append(left);

  return a;
}

