import "./styles.css";

import { initNotesStore } from "./store/notesStore";
import { Router } from "./router/router";
import { HomeView } from "./views/HomeView";
import { CreateView } from "./views/CreateView";
import { NoteDetailView } from "./views/NoteDetailView";
import { NotFoundView } from "./views/NotFoundView";

function AppShell() {
  const container = document.createElement("div");
  container.className = "container";

  const topbar = document.createElement("header");
  topbar.className = "topbar";

  const brand = document.createElement("a");
  brand.className = "brand";
  brand.href = "/";
  brand.setAttribute("data-link", "true");

  const logo = document.createElement("div");
  logo.className = "brand__logo";

  const title = document.createElement("div");
  title.className = "brand__title";
  const strong = document.createElement("strong");
  strong.textContent = "Notes SPA";
  const span = document.createElement("span");
  span.textContent = "Vanilla TS + Router + Vite";
  title.append(strong, span);

  brand.append(logo, title);

  const nav = document.createElement("nav");
  nav.className = "nav";

  const home = document.createElement("a");
  home.className = "btn";
  home.href = "/";
  home.setAttribute("data-link", "true");
  home.textContent = "Home";

  const create = document.createElement("a");
  create.className = "btn btn--primary";
  create.href = "/create";
  create.setAttribute("data-link", "true");
  create.textContent = "Create";

  nav.append(home, create);
  topbar.append(brand, nav);

  const main = document.createElement("main");
  main.className = "main";

  container.append(topbar, main);
  return { container, main };
}

function mount() {
  initNotesStore();

  const app = document.getElementById("app");
  if (!app) throw new Error("Missing #app");
  app.innerHTML = "";

  const { container, main } = AppShell();
  app.append(container);

  const router = new Router();

  const renderIntoMain = (node: HTMLElement) => {
    main.replaceChildren(node);
  };

  router
    .add("/", () => renderIntoMain(HomeView()))
    .add("/create", () => renderIntoMain(CreateView(router)))
    .add("/note/:id", ({ params }) => renderIntoMain(NoteDetailView(router, params.id)))
    .setNotFound(() => renderIntoMain(NotFoundView(router)));

  router.interceptLinks();
  router.start();
}

mount();

