const getReader = require("../reader.js");

async function main() {
  const rl = getReader("./input.txt");

  let totalOfValidGames = 0;

  for await (const line of rl) {
    totalOfValidGames += getValidGameNumberP2(line);
  }

  console.log({ totalOfValidGames });
}

main();

/**
 * @param {string} line
 *
 */
function getValidGameNumberP1(line) {
  let redCubes = 12;
  let greenCubes = 13;
  let blueCubes = 14;

  // get game number
  const gameNumber = line.split(":")[0].split(" ")[1];

  // get game data
  const gameData = line.split(":")[1].split(";");

  let isValid = true;

  mainLoop: for (const game of gameData) {
    const cubes = game.split(",");

    for (const cube of cubes) {
      const cubeCount = cube.trim().split(" ")[0];
      const cubeColor = cube.trim().split(" ")[1];

      switch (cubeColor) {
        case "red":
          redCubes -= cubeCount;
          break;
        case "green":
          greenCubes -= cubeCount;
          break;
        case "blue":
          blueCubes -= cubeCount;
          break;
      }

      if (redCubes < 0 || greenCubes < 0 || blueCubes < 0) {
        isValid = false;
        break mainLoop;
      } else {
        redCubes = 12;
        greenCubes = 13;
        blueCubes = 14;
      }
    }
  }

  if (isValid) return parseInt(gameNumber);

  return 0;
}

/**
 * @param {string} line
 *
 */
function getValidGameNumberP2(line) {
  // get game data
  const gameData = line.split(":")[1].split(";");

  let maxValRed = 0;
  let maxValGreen = 0;
  let maxValBlue = 0;

  for (const game of gameData) {
    const cubes = game.split(",");

    for (const cube of cubes) {
      const cubeCount = cube.trim().split(" ")[0];
      const cubeColor = cube.trim().split(" ")[1];

      switch (cubeColor) {
        case "red":
          maxValRed = Math.max(maxValRed, cubeCount);
          break;
        case "green":
          maxValGreen = Math.max(maxValGreen, cubeCount);
          break;
        case "blue":
          maxValBlue = Math.max(maxValBlue, cubeCount);
          break;
      }
    }
  }

  return maxValRed * maxValGreen * maxValBlue;
}
