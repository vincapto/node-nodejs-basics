import { dirname, join } from 'path';
import * as zlib from 'zlib';
import { createWriteStream, createReadStream } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const name = 'fileToCompress.txt';
const zippedFile = 'archive.gz';
const filePath = join(__dirname, 'files', name);
const zippedFilePath = join(__dirname, 'files', zippedFile);

const zip = zlib.createGzip();

const compress = async () => {
  const writeStream = createWriteStream(zippedFilePath);
  const readStream = createReadStream(filePath);
  readStream.pipe(zip).pipe(writeStream);
};

await compress();
