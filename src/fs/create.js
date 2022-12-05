import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const name = 'fresh.txt';
const content = 'I am fresh and young';
const dest = 'files';
const errorText = 'FS operation failed';

const filePath = path.resolve(__dirname, dest, name);
const writeStream = fs.createWriteStream(filePath, 'utf8');

const create = async () => {
  try {
    fs.access(path.join(filePath), fs.constants.F_OK, async (err) => {
      if (!err) errorShow();
      else {
        await writeStream.write(`${content}\n`, 'utf8');
      }
    });
  } catch (error) {
    throw new Error(errorText);
  }
};

function errorShow() {
  throw new Error(errorText);
}

await create();
