const fs = require('fs');
const path = require('path');

const sourceFolder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

if (!fs.existsSync(copyFolder)) {
  fs.mkdirSync(copyFolder);
}

function copyFile(sourcePath, copyPath) {
  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(copyPath);
  readStream.pipe(writeStream);
}

function copyDirectory(source, copy) {
  fs.readdir(source, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((fileName) => {
      const sourcePath = path.join(source, fileName);
      const copyPath = path.join(copy, fileName);

      fs.stat(sourcePath, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }

        if (stats.isFile()) {
          copyFile(sourcePath, copyPath);
        } else if (stats.isDirectory()) {
          if (!fs.existsSync(copyPath)) {
            fs.mkdirSync(copyPath);
          }
          copyDirectory(sourcePath, copyPath);
        }
      });
    });
  });
}

copyDirectory(sourceFolder, copyFolder);