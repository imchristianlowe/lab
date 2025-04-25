import "./mermaid.min.js";

console.log("Initialize third-party libraries here");
mermaid.registerIconPacks([
  {
    name: "logos",
    loader: () => fetch("/static/icons/logos.json").then((res) => res.json()),
  },
  {
    name: "mdi",
    loader: () => fetch("/static/icons/mdi.json").then((res) => res.json()),
  },
]);
