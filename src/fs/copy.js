import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { promises as fs } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
	const sourcePath = join(__dirname, "files");
	const targetPath = join(__dirname, "files_copy");

	try {
		await fs.access(sourcePath);

		try {
			await fs.access(targetPath);
			throw new Error("FS operation failed");
		} catch (error) {
			if (error.code === "ENOENT") {
				await fs.mkdir(targetPath);

				const files = await fs.readdir(sourcePath);

				for (const file of files) {
					const sourceFilePath = join(sourcePath, file);
					const targetFilePath = join(targetPath, file);

					const content = await fs.readFile(sourceFilePath);

					await fs.writeFile(targetFilePath, content);
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

copy();
