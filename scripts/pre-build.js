const fs = require('fs');
const { version } = require('../package.json');

const constantsFile = './src/config/constants.js';

fs.readFile(constantsFile, 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    throw new Error(err);
  }
  const result = data.replace(/0.0.0/g, version || '');

  fs.writeFile(constantsFile, result, 'utf8', (writeErr) => {
    if (writeErr) {
      console.log(writeErr);
      throw new Error(writeErr);
    }
  });
});
