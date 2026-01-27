import type { Router } from "../router/router";

export function NotFoundView(router: Router): HTMLElement {
  const wrapper = document.createElement("div");

  const header = document.createElement("div");
  header.className = "main__header";
  const left = document.createElement("div");
  const h1 = document.createElement("h1");
  h1.textContent = "404";
  const p = document.createElement("p");
  p.textContent = "Page not found.";
  left.append(h1, p);
  header.append(left);

  const content = document.createElement("div");
  content.className = "main__content";

  const back = document.createElement("button");
  back.type = "button";
  back.className = "btn btn--primary";
  back.textContent = "Go to Home";
  back.addEventListener("click", () => router.navigate("/"));

  content.append(back);
  wrapper.append(header, content);
  return wrapper;
}

