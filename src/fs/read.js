import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const name = 'fileToRead.txt';
const dest = 'files';
const errorText = 'FS operation failed';

const filePath = path.resolve(__dirname, dest, name);

function errorShow() {
  throw new Error(errorText);
}

const read = async () => {
  try {
    fs.access(path.join(filePath), fs.constants.F_OK, async (err) => {
      if (err) errorShow();
      else {
        const text = await fs.promises.readFile(filePath, 'utf-8');
        console.log(text);
      }
    });
  } catch (error) {
    throw new Error(errorText);
  }
};

await read();
