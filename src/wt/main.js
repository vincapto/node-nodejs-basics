import { Worker } from 'worker_threads';
import { cpus } from 'os';
import { join } from 'path';

const performCalculations = async () => {
	const numCores = cpus().length;
	const workerPath = join(__dirname, "worker.js");
	const results = [];

	const workerPromises = [];

	for (let i = 0; i < numCores; i++) {
		const taskNumber = 10 + i;

		const workerPromise = new Promise((resolve, reject) => {
			const worker = new Worker(workerPath);

			worker.on("message", (result) => {
				if (result === null) {
					resolve({
						status: "error",
						data: null,
					});
				} else {
					resolve({
						status: "resolved",
						data: result,
					});
				}
			});

			worker.on("error", () => {
				resolve({
					status: "error",
					data: null,
				});
			});

			worker.postMessage(taskNumber);
		});

		workerPromises.push(workerPromise);
	}

	results.push(...(await Promise.all(workerPromises)));

	console.log(results);
};

await performCalculations();
