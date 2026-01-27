import { listNotes } from "../store/notesStore";
import { NoteListComponent } from "../components/NoteListComponent";

export function HomeView(): HTMLElement {
  const wrapper = document.createElement("div");

  const header = document.createElement("div");
  header.className = "main__header";
  const left = document.createElement("div");
  const h1 = document.createElement("h1");
  h1.textContent = "All notes";
  const p = document.createElement("p");
  p.textContent = "Click a note to view details.";
  left.append(h1, p);

  const right = document.createElement("div");
  const create = document.createElement("a");
  create.className = "btn btn--primary";
  create.href = "/create";
  create.setAttribute("data-link", "true");
  create.textContent = "Create note";
  right.append(create);

  header.append(left, right);

  const content = document.createElement("div");
  content.className = "main__content";
  content.append(NoteListComponent({ notes: listNotes() }));

  wrapper.append(header, content);
  return wrapper;
}

