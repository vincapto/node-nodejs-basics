import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const name = 'wrongFilename.txt';
const newName = 'properFilename.md';
const dest = 'files';
const errorText = 'FS operation failed';

const filePath = path.resolve(__dirname, dest, name);
const filePathNew = path.resolve(__dirname, dest, newName);

function errorShow() {
  throw new Error(errorText);
}

const rename = async () => {
  try {
    fs.access(path.join(filePath), fs.constants.F_OK, async (err) => {
      if (err) errorShow();
      else {
        const text = await fs.promises.rename(filePath, filePathNew);
      }
    });
  } catch (error) {
    throw new Error(errorText);
  }
};

await rename();
