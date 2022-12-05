const match = 'RSS_';
const parsedList = [];

const parseEnv = () => {
  Object.keys(process.env).forEach((a) => {
    if (a.match(match)) parsedList.push(`${a}=${process.env[a]}`);
  });
  console.log(parsedList.join(';'));
};

parseEnv();
