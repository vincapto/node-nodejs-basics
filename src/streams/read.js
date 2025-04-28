import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { createReadStream } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const read = async () => {
	return new Promise((resolve, reject) => {
		const filePath = join(__dirname, "files", "fileToRead.txt");
		const readStream = createReadStream(filePath);

		readStream.on("error", (error) => {
			reject(error);
		});

		readStream.pipe(process.stdout);

		readStream.on("end", () => {
			resolve();
		});
	});
};

await read();
