const fs = require('fs');
const path = require('path');

const folderPath = `03-files-in-folder/secret-folder/`;

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach((fileName) => {
    const filePath = path.join(folderPath, fileName);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      if (stats.isFile()) {
        const fileExtension = path.extname(fileName).slice(1);
        const fileSize = stats.size / 1024;
        console.log(`${fileName}-${fileExtension}-${fileSize.toFixed(3)}kb`);
      }
    });
  });
});