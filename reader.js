const fs = require("fs");
const readline = require("readline");
/**
 * @param {string} filePath
 *
 */
function getReader(filePath) {
  const fileStream = fs.createReadStream(filePath);

  return readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
}

module.exports = getReader;
