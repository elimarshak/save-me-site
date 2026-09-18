import { layers, namedFlavor } from "@protomaps/basemaps";
import { writeFileSync } from "node:fs";

const flavor = namedFlavor("light");
// One background layer for the whole map. A second one paints over everything drawn before it,
// so the country that comes first would disappear behind a flat grey.
const norway = layers("norway", flavor, { lang: "he" });
const israel = layers("israel", flavor, { lang: "he" })
  .filter((l) => l.type !== "background")
  .map((l) => ({ ...l, id: l.id + "_il" }));

const style = {
  version: 8,
  glyphs: "{ASSETS}/fonts/{fontstack}/{range}.pbf",
  sprite: "{ASSETS}/sprites/v4/light",
  sources: {
    norway: { type: "vector", url: "pmtiles://{NORWAY}", attribution: "OpenStreetMap" },
    israel: { type: "vector", url: "pmtiles://{ISRAEL}", attribution: "OpenStreetMap" },
  },
  layers: [...norway, ...israel],
};
writeFileSync("style.json", JSON.stringify(style));
console.log("layers:", style.layers.length, "backgrounds:", style.layers.filter((l) => l.type === "background").length);
