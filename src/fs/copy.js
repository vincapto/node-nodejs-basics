import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

const name = 'files';
const dest = 'files-copy';
const errorText = 'FS operation failed';
const copyPath = path.join(dirname, dest);
const currentFolder = path.join(dirname, name);

const copy = async () => {
  fs.access(copyPath, fs.constants.F_OK, async (err) => {
    if (!err) errorShow();
    else {
      await fs.promises.mkdir(copyPath, { recursive: true });
      await readFolder(currentFolder, copyPath);
    }
  });

  async function readFolder(dirname, dest) {
    await fs.readdir(dirname, { withFileTypes: true }, (err, files) => {
      if (err) errorShow();
      else readFiles(dirname, files, dest);
    });
  }

  async function readFiles(dirname, files, dest) {
    files.forEach((file) => {
      console.log(file);
      const { base } = path.parse(file.name);
      const filePath = path.resolve(dirname, base);
      fs.stat(filePath, (error, stats) => {
        if (error) {
          errorShow();
        } else {
          if (stats.isFile())
            fs.promises.copyFile(
              path.join(dirname, base),
              path.join(dest, base)
            );
        }
      });
    });
  }
};
function errorShow() {
  throw new Error(errorText);
}

await copy();
