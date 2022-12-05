import * as path from 'path';
import { fileURLToPath } from 'url';
import { fork, spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const name = 'files/script.js';
const filePath = path.join(__dirname, name);

const spawnChildProcess = async (args) => {
  const ls = fork(filePath, [...args]);
  ls.on('data', (data) => {
    process.stdout.write(data);
  });
  ls.on('data', (data) => {
    process.stdder.write(data);
  });
  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

spawnChildProcess([1, 2, 3, 4]);
