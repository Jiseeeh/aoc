const fs = require("fs");
const readline = require("readline");
/**
 * @param {string} filePath
 *
 */
function getReader(filePath) {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  return rl;
}

module.exports = getReader;
