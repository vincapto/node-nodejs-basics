import { unlink, access } from 'fs/promises';
import { join, dirname } from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
	const filePath = join(__dirname, "files", "fileToRemove.txt");

	try {
		await access(filePath);

		await unlink(filePath);
	} catch (error) {
		throw new Error("FS operation failed");
	}
};

await remove();
