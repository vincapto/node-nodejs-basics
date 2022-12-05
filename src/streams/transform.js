import { Transform } from 'stream';
import { createInterface } from 'readline';

const line = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const createTransformStream = () => {
  return new Transform({
    decodeStrings: false,
    encoding: 'utf8',
    transform(chunk, enc, callback) {
      const reverse = chunk.toString().split('').reverse().join('');
      callback(null, reverse);
    },
  });
};

const transform = async () => {
  const transformStream = createTransformStream();
  // process.stdin.pipe(transformStream).pipe(process.stdout);
  transformStream.pipe(process.stdout);
  line.on('line', (data) => {
    console.log(`initial line: ${data}`);
    console.log('result: ');
    transformStream.write(data);
    line.clearLine();
  });
};

transform();
