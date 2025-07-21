import * as fs from "fs";
import * as path from "path";
import type { Map } from "./types";

function writeMapTsFile(tmjPath: string, mapObj: Map) {
  const tsPath = tmjPath.replace(/\.tmj$/, ".ts");
  const out = `// Auto-generated from ${path.basename(tmjPath)}
  import type { Map } from "../types";

export const map: Map = ${JSON.stringify(mapObj, null, 2)} as const;
`;
  fs.writeFileSync(tsPath, out, "utf-8");
  console.log(`Wrote: ${tsPath}`);
}

async function main() {
  // Parse -file option from command line args
  const fileArgIndex = process.argv.indexOf("-file");
  let filePath: string;
  if (fileArgIndex !== -1 && process.argv[fileArgIndex + 1]) {
    filePath = process.argv[fileArgIndex + 1];
  } else {
    filePath = "test/smallgrass.tmj";
  }

  const tmjPath = path.resolve(filePath);
  if (!fs.existsSync(tmjPath)) {
    console.error("File not found:", tmjPath);
    process.exit(1);
  }
  const tmj = JSON.parse(fs.readFileSync(tmjPath, "utf-8"));

  const layers: Map["layers"] = {
    foreground: [],
    background: [],
    objects: [],
  };

  const collision: Map["collision"] = [];
  for (const layer of tmj.layers) {
    if (layer.name === "foreground" || layer.name === "background") {
      layers[layer.name] = layer.data;
    }
    if (layer.name === "collision") {
      for (let i = 0; i < layer.data.length; i++) {
        if (layer.data[i] === 0) continue; // Skip empty tiles
        const x = i % layer.width;
        const y = Math.floor(i / layer.width);
        collision.push([x, y]);
      }
    }
    if (layer.name === "objects") {
      // Handle objects layer if needed
      // For now, we will just log it
      layers.objects = layer.objects.map((item: any) => ({
        name: item.name,
        type: item.type,
        x: item.x,
        y: item.y,
        width: item.width,
        height: item.height,
      }));
      console.log("Objects layer found:", JSON.stringify(layer));
    }
  }

  const mapObj: Map = {
    id: path.basename(tmjPath, ".tmj"),
    width: tmj.width,
    height: tmj.height,
    layers,
    collision,
    tilesets: tmj.tilesets
      .map((ts) => ({
        source: ts.source
          .split("/")
          .pop()
          .replace(/\.tsx$/, ""),
        firstgid: ts.firstgid,
      }))
      .toSorted((a, b) => {
        return a.firstgid < b.firstgid ? 1 : -1;
      }),
  };
  console.log("tilesets", mapObj.tilesets);
  writeMapTsFile(tmjPath, mapObj);
}

main();
