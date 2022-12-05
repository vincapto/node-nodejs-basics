import { dirname, join } from 'path';
import * as zlib from 'zlib';
import { createWriteStream, createReadStream } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const name = 'archive.gz';
const zippedFile = 'decompressedFile.txt';
const filePath = join(__dirname, 'files', name);
const zippedFilePath = join(__dirname, 'files', zippedFile);

const zip = zlib.createUnzip();
const readStream = createReadStream(filePath);
const writeStream = createWriteStream(zippedFilePath);

const decompress = async () => {
  try {
    readStream.pipe(zip).pipe(writeStream);
  } catch (error) {
    console.log(error);
  }
};

await decompress();
