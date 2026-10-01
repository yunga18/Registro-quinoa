import {build} from 'esbuild';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
await build({entryPoints:['app.mjs'],bundle:true,minify:true,platform:'browser',outfile:'app.js',legalComments:'eof'});
const files=['index.html','style.css','app.js','manifest.webmanifest','favicon.svg','icon-192.png','icon-512.png'];
const hash=createHash('sha256');for(const f of files){hash.update(f);hash.update(await readFile(f));}const version=hash.digest('hex').slice(0,16);
const source=await readFile('sw-template.js','utf8');await writeFile('sw.js',source.replace('__APP_VERSION__',version));
console.log(`App preparada para GitHub Pages. Versión sin conexión: ${version}`);
