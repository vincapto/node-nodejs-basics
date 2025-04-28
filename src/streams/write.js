import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { createWriteStream } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
	return new Promise((resolve, reject) => {
		const filePath = join(__dirname, "files", "fileToWrite.txt");
		const writeStream = createWriteStream(filePath);

		writeStream.on("error", (error) => {
			reject(error);
		});

		process.stdin.pipe(writeStream);

		process.stdin.on("end", () => {
			resolve();
		});
	});
};

await write();
