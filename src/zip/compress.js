import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';

import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { createReadStream, createWriteStream } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
	try {
		const sourceFile = join(__dirname, "files", "fileToCompress.txt");
		const destinationFile = join(__dirname, "files", "archive.gz");

		const sourceStream = createReadStream(sourceFile);
		const destinationStream = createWriteStream(destinationFile);
		const gzipStream = createGzip();

		await pipeline(sourceStream, gzipStream, destinationStream);
	} catch (error) {
		throw error;
	}
};

await compress();