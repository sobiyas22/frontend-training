export type RouteContext = {
  path: string;
  params: Record<string, string>;
};

export type RouteHandler = (ctx: RouteContext) => void;

type RouteDef = {
  pattern: RegExp;
  keys: string[];
  handler: RouteHandler;
};

function compilePath(pathPattern: string): { pattern: RegExp; keys: string[] } {
  // supports "/note/:id" style patterns
  const keys: string[] = [];
  const escaped = pathPattern
    .split("/")
    .map((seg) => {
      if (seg.startsWith(":")) {
        keys.push(seg.slice(1));
        return "([^/]+)";
      }
      return seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    })
    .join("/");
  return { pattern: new RegExp(`^${escaped}$`), keys };
}

export class Router {
  private routes: RouteDef[] = [];
  private onNotFound: RouteHandler = () => {};

  add(pathPattern: string, handler: RouteHandler) {
    const { pattern, keys } = compilePath(pathPattern);
    this.routes.push({ pattern, keys, handler });
    return this;
  }

  setNotFound(handler: RouteHandler) {
    this.onNotFound = handler;
    return this;
  }

  start() {
    window.addEventListener("popstate", () => this.render(location.pathname));
    this.render(location.pathname);
  }

  navigate(path: string) {
    history.pushState({}, "", path);
    this.render(path);
  }

  interceptLinks() {
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest("a[data-link='true']") as HTMLAnchorElement | null;
      if (!a) return;

      // ignore new tab / modified clicks
      if (a.target === "_blank") return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const href = a.getAttribute("href");
      if (!href) return;

      // keep only same-origin, root-relative paths like "/create"
      if (!href.startsWith("/")) return;

      e.preventDefault();
      this.navigate(href);
    });
  }

  private render(path: string) {
    for (const r of this.routes) {
      const match = path.match(r.pattern);
      if (!match) continue;
      const params: Record<string, string> = {};
      r.keys.forEach((k, i) => {
        params[k] = decodeURIComponent(match[i + 1] ?? "");
      });
      r.handler({ path, params });
      return;
    }
    this.onNotFound({ path, params: {} });
  }
}

