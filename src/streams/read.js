import { createWriteStream, promises } from 'fs';
import { dirname, resolve } from 'path';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';

const line = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const name = 'fileToRead.txt';
const dest = 'files';

const filePath = resolve(__dirname, dest, name);

const read = async () => {
  console.log('Text from file \n');
  const text = await promises.readFile(filePath, 'utf-8');
  line.write(text);
};

await read();
