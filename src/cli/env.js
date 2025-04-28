const parseEnv = () => {
	const envVars = process.env;
	const rssVars = {};

	Object.keys(envVars).forEach((key) => {
		if (key.startsWith("RSS_")) {
			rssVars[key] = envVars[key];
		}
	});

	const output = Object.entries(rssVars)
		.map(([key, value]) => `${key}=${value}`)
		.join("; ");

	if (output) {
		console.log(output);
	}
};

parseEnv();
