import { rename as fsRename, access } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
	const sourceFile = join(__dirname, "files", "wrongFilename.txt");
	const targetFile = join(__dirname, "files", "properFilename.md");

	try {
		await access(sourceFile);

		try {
			await access(targetFile);
			throw new Error("FS operation failed");
		} catch (error) {
			if (error.code === "ENOENT") {
				try {
					await fsRename(sourceFile, targetFile);
				} catch (err) {
					throw new Error("FS operation failed");
				}
			} else {
				throw new Error("FS operation failed");
			}
		}
	} catch (error) {
		if (error.message === "FS operation failed") {
			throw error;
		}
		throw new Error("FS operation failed");
	}
};

await rename();
