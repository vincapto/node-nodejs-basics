import { Transform } from 'stream';

const transform = async () => {
	return new Promise((resolve, reject) => {
		const reverseStream = new Transform({
			transform(chunk, encoding, callback) {
				const text = chunk.toString();
				const reversed = text.split("").reverse().join("");
				this.push(Buffer.from(reversed));
				callback();
			},
		});

		process.stdin.pipe(reverseStream).pipe(process.stdout);

		process.stdin.on("end", () => {
			resolve();
		});

		process.stdin.on("error", (error) => {
			reject(error);
		});
	});
};

await transform();
