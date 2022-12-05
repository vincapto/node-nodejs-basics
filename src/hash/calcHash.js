import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const name = 'fileToCalculateHashFor.txt';
const filePath = path.join(__dirname, 'files', name);

const calculateHash = async () => {
  const text = await fs.promises.readFile(filePath, 'utf-8');
  const hash = createHash('SHA256').update(text).digest('hex');
  console.log(text);
  console.log(hash);
};

await calculateHash();
