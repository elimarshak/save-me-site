import { layers, namedFlavor } from "@protomaps/basemaps";
import { writeFileSync } from "node:fs";
const flavor = namedFlavor("light");
const il = layers("israel", flavor, { lang: "he" }).map((l) => ({ ...l, id: l.id + "_il" }));
const style = {
  version: 8,
  glyphs: "{ASSETS}/fonts/{fontstack}/{range}.pbf",
  sprite: "{ASSETS}/sprites/v4/light",
  sources: {
    norway: { type: "vector", url: "pmtiles://{NORWAY}", attribution: "OpenStreetMap" },
    israel: { type: "vector", url: "pmtiles://{ISRAEL}", attribution: "OpenStreetMap" },
  },
  layers: [...layers("norway", flavor, { lang: "he" }), ...il],
};
writeFileSync("style.json", JSON.stringify(style));
console.log("style layers:", style.layers.length);
