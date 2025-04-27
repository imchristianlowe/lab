import "./mermaid.min.js";

mermaid.registerIconPacks([
  {
    name: "logos",
    loader: () =>
      fetch("/lab/static/icons/logos.json").then((res) => res.json()),
  },
  {
    name: "mdi",
    loader: () => fetch("/lab/static/icons/mdi.json").then((res) => res.json()),
  },
]);
