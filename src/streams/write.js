import { createWriteStream } from 'fs';
import { dirname, resolve } from 'path';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';

const line = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const name = 'fileToWrite.txt';
const dest = 'files';

const filePath = resolve(__dirname, dest, name);
const writeStream = createWriteStream(filePath, 'utf8');

function writeLine(data) {
  writeStream.write(`${data}\n`, 'utf8');
  console.log(`line "${data}" is written\n`);
}

const write = async () => {
  console.log('Enter line \n');
  line.on('line', (data) => {
    if (data !== 'exit') writeLine(data);
  });
};

await write();
