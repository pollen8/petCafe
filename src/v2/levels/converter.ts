import * as fs from "fs";
import * as path from "path";
import * as xml2js from "xml2js";
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

async function getTilesetInfo(
  tsPath: string
): Promise<Record<string, unknown>> {
  const xml = fs.readFileSync(tsPath, "utf-8");
  const parsed = await xml2js.parseStringPromise(xml);
  const attrs = parsed.tileset.$;
  return {
    tilewidth: Number(attrs.tilewidth),
    tileheight: Number(attrs.tileheight),
    tilecount: Number(attrs.tilecount),
    columns: Number(attrs.columns),
  };
}

async function main() {
  // Parse -file option from command line args
  const fileArgIndex = process.argv.indexOf("-file");
  let filePath: string = "";
  if (fileArgIndex !== -1 && process.argv[fileArgIndex + 1]) {
    filePath = process.argv[fileArgIndex + 1];
  } else {
    console.log("not found", fileArgIndex, process.argv);
    // return;
    process.exit(1);
    // filePath = "test/smallgrass.tmj";
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
    backgroundDecoration: [],
    objects: [],
  };

  const collision: Map["collision"] = [];
  for (const layer of tmj.layers) {
    if (
      layer.name === "foreground" ||
      layer.name === "background" ||
      layer.name === "backgroundDecoration"
    ) {
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
      layers.objects = layer.objects.map((item: unknown) => {
        const obj = item as Record<string, unknown>;
        return {
          name: obj.name,
          type: obj.type,
          x: obj.x,
          y: obj.y,
          width: obj.width,
          height: obj.height,
        };
      });
      console.log("Objects layer found:", JSON.stringify(layer));
    }
  }

  // Read tileset XMLs and enrich tileset info
  const tilesets: Record<string, unknown>[] = [];
  for (const ts of tmj.tilesets) {
    const tsFile = path.resolve(path.dirname(tmjPath), ts.source);
    const info = await getTilesetInfo(tsFile);
    tilesets.push({
      source: ts.source
        .split("/")
        .pop()
        .replace(/\.tsx$/, ""),
      firstgid: ts.firstgid,
      ...info,
    });
  }

  const mapObj: Map = {
    id: path.basename(tmjPath, ".tmj"),
    width: tmj.width,
    height: tmj.height,
    layers,
    collision,
    tilesets: tilesets.toSorted((a, b) => {
      return (a.firstgid as number) < (b.firstgid as number) ? 1 : -1;
    }),
  };
  writeMapTsFile(tmjPath, mapObj);
}

main();
