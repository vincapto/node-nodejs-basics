import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { createReadStream, createWriteStream } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const decompress = async () => {
	try {
		const sourceFile = join(__dirname, "files", "archive.gz");
		const destinationFile = join(__dirname, "files", "fileToCompress.txt");

		const sourceStream = createReadStream(sourceFile);
		const destinationStream = createWriteStream(destinationFile);
		const gunzipStream = createGunzip();

		await pipeline(sourceStream, gunzipStream, destinationStream);
	} catch (error) {
		throw error;
	}
};

await decompress();

