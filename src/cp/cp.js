import { spawn } from 'child_process';
import path from 'path';

const spawnChildProcess = async (args) => {
	return new Promise((resolve, reject) => {
		const scriptPath = path.join(__dirname, "files", "script.js");

		const child = spawn("node", [scriptPath, ...args], {
			stdio: ["pipe", "pipe", "pipe"],
		});

		process.stdin.on("data", (data) => {
			child.stdin.write(data);
		});

		child.stdout.on("data", (data) => {
			process.stdout.write(data);
		});

		child.on("error", (error) => {
			reject(error);
		});

		child.on("exit", (code) => {
			resolve();
		});
	});
};

export { spawnChildProcess };

