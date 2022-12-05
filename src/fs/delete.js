import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const name = 'fileToRemove.txt';
const dest = 'files';
const errorText = 'FS operation failed';

const filePath = path.resolve(__dirname, dest, name);

const remove = async () => {
  try {
    fs.access(filePath, fs.constants.F_OK, async (err) => {
      if (err) errorShow();
      else {
        await fs.unlink(filePath, (err) => {
          if (err) console.log('error occurred');
          else console.log('file was deleted');
        });
      }
    });
  } catch (error) {
    throw new Error(errorText);
  }
};

function errorShow() {
  throw new Error(errorText);
}

await remove();
