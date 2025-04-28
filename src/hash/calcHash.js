import { createReadStream } from "fs";
import { createHash } from "crypto";

import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const calculateHash = async () => {
	return new Promise((resolve, reject) => {
		const filePath = join(__dirname, "files", "fileToCalculateHashFor.txt");
		const hash = createHash("sha256");

		const stream = createReadStream(filePath);

		stream.on("error", (error) => {
			reject(new Error("FS operation failed"));
		});

		stream.on("data", (chunk) => {
			hash.update(chunk);
		});

		stream.on("end", () => {
			console.log(hash.digest("hex"));
			resolve();
		});
	});
};

await calculateHash();
