export type CreateNoteState = {
  title: string;
  content: string;
};

export type CreateNoteProps = {
  onSubmit: (note: { title: string; content: string }) => void;
  onCancel: () => void;
};

export function CreateNoteComponent(props: CreateNoteProps): HTMLElement {
  // "State" lives inside the component
  const state: CreateNoteState = {
    title: "",
    content: ""
  };

  const form = document.createElement("form");

  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = "e.g. Shopping list";
  titleInput.maxLength = 80;
  titleInput.addEventListener("input", () => {
    state.title = titleInput.value;
  });
  titleLabel.append(titleInput);

  const contentLabel = document.createElement("label");
  contentLabel.textContent = "Content";
  const contentInput = document.createElement("textarea");
  contentInput.placeholder = "Write your note...";
  contentInput.addEventListener("input", () => {
    state.content = contentInput.value;
  });
  contentLabel.append(contentInput);

  const actions = document.createElement("div");
  actions.className = "formActions";

  const submit = document.createElement("button");
  submit.type = "submit";
  submit.className = "btn btn--primary";
  submit.textContent = "Create note";

  const cancel = document.createElement("button");
  cancel.type = "button";
  cancel.className = "btn";
  cancel.textContent = "Cancel";
  cancel.addEventListener("click", () => props.onCancel());

  actions.append(submit, cancel);

  const hint = document.createElement("div");
  hint.style.color = "rgba(255,255,255,0.55)";
  hint.style.fontSize = "12px";
  hint.textContent = "Tip: Notes are saved in localStorage for this browser.";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = state.title.trim();
    const content = state.content.trim();
    if (!title && !content) return;
    props.onSubmit({ title: title || "(Untitled)", content });
  });

  form.append(titleLabel, contentLabel, actions, hint);
  return form;
}

