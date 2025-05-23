import path from "path";
import { release, version } from "os";
import { createServer as createServerHttp } from "http";
import "./files/c.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFile } from "fs/promises";

const random = Math.random();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let unknownObject;

if (random > 0.5) {
	const filePath = path.join(__dirname, "files", "a.json");
	unknownObject = JSON.parse(await readFile(filePath, "utf8"));
} else {
	const filePath = path.join(__dirname, "files", "b.json");
	unknownObject = JSON.parse(await readFile(filePath, "utf8"));
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
	res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
	console.log("To terminate it, use Ctrl+C combination");
});

const createMyServer = () => {
	return createServerHttp((_, res) => {
		res.end("Request accepted");
	});
};

export { unknownObject, createMyServer };
