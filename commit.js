const { exec } = require("child_process");
const fs = require("fs");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeCommit(count) {
  if (count > 0) {
    fs.writeFile("random.txt", `Random number: ${Math.random()}\n`, (err) => {
      if (err) throw err;
      exec("git add .", (err, stdout, stderr) => {
        if (err) {
          console.error(`exec error: ${err}`);
          return;
        }
        exec('git commit -m "Random commit"', (err, stdout, stderr) => {
          if (err) {
            console.error(`exec error: ${err}`);
            return;
          }
          console.log(stdout);
          makeCommit(count - 1);
        });
      });
    });
  }
}

const commitCount = getRandomInt(8, 11);
makeCommit(commitCount);
