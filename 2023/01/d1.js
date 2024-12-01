const getReader = require("../../reader.js");

const numsMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function getWordVal(str) {
  for (const numKey of Object.keys(numsMap)) {
    if (str.includes(numKey)) {
      return numsMap[numKey];
    }
  }
  return null;
}

/**
 *
 * @param {string} line
 */
function calibrateLine(line) {
  let pair = "";
  let strNum = "";

  for (let i = 0; i < line.length; i++) {
    if (!isNaN(line[i])) {
      pair += line[i];
    } else {
      strNum += line[i];

      const wordVal = getWordVal(strNum);

      if (wordVal) {
        pair += wordVal;
        strNum = strNum[strNum.length - 1];
      }
    }
  }

  if (pair.length > 2) {
    pair = `${pair[0]}${pair[pair.length - 1]}`;
  } else if (pair.length == 1) {
    pair += pair[0];
  }

  return parseInt(pair);
}

async function main() {
  const rl = getReader("input.txt");

  let total = 0;

  for await (const line of rl) {
    total += calibrateLine(line);
  }

  console.log(total);
}

main();
