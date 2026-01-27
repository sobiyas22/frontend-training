import type { Note } from "../types";
import { formatTimestamp } from "../utils/format";

export type NoteDetailProps = {
  note: Note;
  onDelete: (id: string) => void;
};

export function NoteDetailComponent(props: NoteDetailProps): HTMLElement {
  const { note } = props;

  const root = document.createElement("div");
  root.className = "detail";

  const title = document.createElement("h2");
  title.className = "detail__title";
  title.textContent = note.title || "(Untitled)";

  const meta = document.createElement("div");
  meta.className = "detail__meta";
  meta.textContent = `Created ${formatTimestamp(note.createdAt)}`;

  const content = document.createElement("div");
  content.className = "detail__content";
  content.textContent = note.content || "(No content)";

  const actions = document.createElement("div");
  actions.className = "formActions";

  const back = document.createElement("a");
  back.className = "btn";
  back.href = "/";
  back.setAttribute("data-link", "true");
  back.textContent = "Back";

  const del = document.createElement("button");
  del.type = "button";
  del.className = "btn btn--danger";
  del.textContent = "Delete";
  del.addEventListener("click", () => props.onDelete(note.id));

  actions.append(back, del);
  root.append(title, meta, actions, content);

  return root;
}

