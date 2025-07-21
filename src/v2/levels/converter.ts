import * as fs from "fs";
import * as path from "path";
import type { Map } from "./types";

type JSONMap = Omit<Map, "size"> & { width: number; height: number };

function writeMapTsFile(tmjPath: string, mapObj: JSONMap) {
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
  }

  const mapObj: JSONMap = {
    id: path.basename(tmjPath, ".tmj"),
    width: tmj.width,
    height: tmj.height,
    layers,
    collision,
    tilesets: tmj.tilesets.map((ts) => ({
      source: ts.source.replace(/\.tsx$/, ""),
      firstgid: ts.firstgid,
    })),
    // resources: [],
  };

  writeMapTsFile(tmjPath, mapObj);
}

main();
