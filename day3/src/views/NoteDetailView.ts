import { NoteDetailComponent } from "../components/NoteDetailComponent";
import { deleteNote, getNote } from "../store/notesStore";
import type { Router } from "../router/router";

export function NoteDetailView(router: Router, id: string): HTMLElement {
  const wrapper = document.createElement("div");

  const note = getNote(id);
  if (!note) {
    const header = document.createElement("div");
    header.className = "main__header";
    const left = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.textContent = "Not found";
    const p = document.createElement("p");
    p.textContent = "That note doesn't exist (maybe it was deleted).";
    left.append(h1, p);
    header.append(left);

    const content = document.createElement("div");
    content.className = "main__content";
    const back = document.createElement("a");
    back.className = "btn";
    back.href = "/";
    back.setAttribute("data-link", "true");
    back.textContent = "Back to notes";
    content.append(back);

    wrapper.append(header, content);
    return wrapper;
  }

  const header = document.createElement("div");
  header.className = "main__header";
  const left = document.createElement("div");
  const h1 = document.createElement("h1");
  h1.textContent = "Note details";
  const p = document.createElement("p");
  p.textContent = "View (and optionally delete) a note.";
  left.append(h1, p);
  header.append(left);

  const content = document.createElement("div");
  content.className = "main__content";
  content.append(
    NoteDetailComponent({
      note,
      onDelete: (noteId) => {
        deleteNote(noteId);
        router.navigate("/");
      }
    })
  );

  wrapper.append(header, content);
  return wrapper;
}

