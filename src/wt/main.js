import { Worker, parentPort } from 'worker_threads';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
import os from 'os';
const __dirname = dirname(__filename);
const name = 'worker.js';
const filePath = join(__dirname, name);

const runService = (workerData) => {
  console.log('----', workerData);
  return new Promise((resolve, reject) => {
    const worker = new Worker(filePath, { workerData });
    worker.on('message', (data) => {
      resolve({ status: 'resolved', data });
    });
    worker.on('error', () => {
      reject({ status: 'error', data: null });
    });
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`stopped with  ${code} exit code`));
    });
  });
};

const performCalculations = async () => {
  const length = os.cpus().length;
  const workerList = await new Array(length).fill(0).map(async (a, i) => {
    return await runService(i + 10);
  });
  return await Promise.all(workerList);
  // Write your code here
};

const res = await performCalculations();

console.log('res', res);
