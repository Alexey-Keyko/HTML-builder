const fs = require('fs');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const targetFile = path.join(__dirname, 'project-dist', 'bundle.css');

function processFile(filePath, writeStream) {
  const readStream = fs.createReadStream(filePath);
  readStream.pipe(writeStream);
}

function processDirectory(source, writeStream) {
  fs.readdir(source, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((fileName) => {
      const filePath = path.join(source, fileName);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }

        if (stats.isFile() && path.extname(filePath) === '.css') {
          processFile(filePath, writeStream);
        } else if (stats.isDirectory()) {
          processDirectory(filePath, writeStream);
        }
      });
    });
  });
}

const writeStream = fs.createWriteStream(targetFile);
processDirectory(stylesFolder, writeStream);