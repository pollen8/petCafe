# Tiled to Level

from `rc/v2/levels`
run `node --experimental-strip-types converter.ts --file test/smallgrass.tmj`

- needs a resource (src/v2/Resoources.ts) with the same name as the tileset.source.e.g.
  the string refers to a file in `/public/`

        grass: "/tiles/grass.png",
