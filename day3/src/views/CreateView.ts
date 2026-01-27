import { CreateNoteComponent } from "../components/CreateNoteComponent";
import { addNote } from "../store/notesStore";
import type { Router } from "../router/router";

export function CreateView(router: Router): HTMLElement {
  const wrapper = document.createElement("div");

  const header = document.createElement("div");
  header.className = "main__header";
  const left = document.createElement("div");
  const h1 = document.createElement("h1");
  h1.textContent = "Create note";
  const p = document.createElement("p");
  p.textContent = "Title + content, stored in localStorage.";
  left.append(h1, p);

  header.append(left);

  const content = document.createElement("div");
  content.className = "main__content";

  content.append(
    CreateNoteComponent({
      onSubmit: ({ title, content }) => {
        addNote({ title, content });
        router.navigate("/");
      },
      onCancel: () => router.navigate("/")
    })
  );

  wrapper.append(header, content);
  return wrapper;
}

