import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dest = 'files';
const errorText = 'FS operation failed';

const filePath = path.resolve(__dirname, dest);

function errorShow() {
  throw new Error(errorText);
}

function readFiles(dirname, files) {
  files.forEach((file) => {
    const { name, ext, base } = path.parse(file.name);
    const filePath = path.resolve(dirname, base);
    fs.stat(filePath, (error, stats) => {
      if (error) {
        console.log(error);
      } else {
        if (stats.isFile())
          showFile({ name, ext, size: (stats.size * 0.001).toFixed(2) });
      }
    });
  });
}

function readFolder(dirname) {
  fs.readdir(dirname, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);
    else readFiles(dirname, files);
  });
}

function showFile({ name, ext, size }) {
  console.log(`${name} - ${ext} - ${size}kb`);
}

const list = async () => {
  try {
    fs.access(path.join(filePath), fs.constants.F_OK, async (err) => {
      if (err) errorShow();
      else {
        readFolder(filePath);
      }
    });
  } catch (error) {
    errorShow();
  }
};

await list();
