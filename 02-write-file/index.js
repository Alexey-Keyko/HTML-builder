const fs = require('fs');
const readline = require('readline');
const path = require('path');

const filename = 'file.txt';
let fileContent = '';
const filePath = path.join(__dirname, 'text.txt');

if (fs.existsSync(filename)) {
  fileContent = fs.readFileSync(filename, 'utf-8');
}

const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptUser() {
  rl.question('Enter text (type "exit" to quit): ', (answer) => {
    if (answer.toLowerCase() === 'exit') {
      console.log('Goodbye!');
      rl.close();
      return;
    }

    writeStream.write(`${answer}\n`);
    fileContent += `${answer}\n`;

    console.log(`"${answer}" has been added to ${filename}.`);
    promptUser();
  });
}

console.log(`Current content of ${filename}:\n${fileContent}`);
promptUser();
