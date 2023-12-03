const getReader = require("../reader.js");

async function main() {
  const rl = getReader("./input.txt");

  for await (const line of rl) {
    grid.push([]);
    convertToGrid(line);

    i++;
  }

  // console.table(grid);c
  checkP1(grid);
  checkP2(grid);
}

const symbols = "@#$%&*-=+/";
const symbolP2 = "*";

const grid = [];
let i = 0;

/**
 * @param {string} line
 */
function convertToGrid(line) {
  for (let j = 0; j < line.length; j++) {
    grid[i][j] = line[j];
  }
}

function checkP1() {
  let sum = 0;
  let number = "";
  let isValid = false;

  for (let row = 0; row < grid.length; row++) {
    number = "";
    traverse: for (let col = 0; col < grid[row].length + 1; col++) {
      if (
        grid[row][col] === "." ||
        symbols.includes(grid[row][col]) ||
        col === grid[row].length
      ) {
        if (isValid) {
          sum += parseInt(number);

          isValid = false;
          number = "";
        } else {
          number = "";
          continue traverse;
        }
      }

      if (!isNaN(grid[row][col])) {
        number += grid[row][col];

        // check each side of cell if it's a symbol

        adjacent: while (!isValid) {
          // left
          if (col - 1 > 0 && symbols.includes(grid[row][col - 1])) {
            isValid = true;
            continue traverse;
          }

          // diagonal top left
          if (
            row - 1 > 0 &&
            col - 1 > 0 &&
            symbols.includes(grid[row - 1][col - 1])
          ) {
            isValid = true;
            continue traverse;
          }

          // top
          if (row - 1 > 0 && symbols.includes(grid[row - 1][col])) {
            isValid = true;
            continue traverse;
          }

          // diagonal top right
          if (
            row - 1 > 0 &&
            col + 1 < grid[row].length &&
            symbols.includes(grid[row - 1][col + 1])
          ) {
            isValid = true;

            continue traverse;
          }

          // right
          if (
            col + 1 < grid[row].length &&
            symbols.includes(grid[row][col + 1])
          ) {
            isValid = true;
            continue traverse;
          }

          // diagonal bottom right
          if (
            row + 1 < grid.length &&
            col + 1 < grid[row].length &&
            symbols.includes(grid[row + 1][col + 1])
          ) {
            isValid = true;
            continue traverse;
          }

          // bottom
          if (row + 1 < grid.length && symbols.includes(grid[row + 1][col])) {
            isValid = true;
            continue traverse;
          }

          // diagonal bottom left
          if (
            row + 1 < grid.length &&
            col - 1 > 0 &&
            symbols.includes(grid[row + 1][col - 1])
          ) {
            isValid = true;
            continue traverse;
          }

          // break if no adjacent symbol
          break adjacent;
        }
      }
    }
  }

  console.log({ sum });
}

function checkP2() {
  let sum = 0;
  let number = "";
  let isValid = false;
  let nums = new Map();
  let matchedSymbolPos = "";

  for (let row = 0; row < grid.length; row++) {
    number = "";

    traverse: for (let col = 0; col < grid[row].length + 1; col++) {
      if (
        grid[row][col] === "." ||
        symbolP2.includes(grid[row][col]) ||
        col === grid[row].length
      ) {
        if (isValid) {
          // console.log({ number });
          if (nums.get(matchedSymbolPos)) {
            nums.set(matchedSymbolPos, [...nums.get(matchedSymbolPos), number]);
          } else nums.set(matchedSymbolPos, [number]);

          isValid = false;
          number = "";
        } else {
          number = "";
          continue traverse;
        }
      }

      if (!isNaN(grid[row][col])) {
        number += grid[row][col];
        // check each side of cell if it's a symbol

        adjacent: while (!isValid) {
          // top
          if (row - 1 > 0 && symbolP2.includes(grid[row - 1][col])) {
            // keep track of matched position of symbol
            matchedSymbolPos = `${row - 1},${col}`;

            isValid = true;
            continue traverse;
          }

          // diagonal bottom right
          if (
            row + 1 < grid.length &&
            col + 1 < grid[row].length &&
            symbolP2.includes(grid[row + 1][col + 1])
          ) {
            matchedSymbolPos = `${row + 1},${col + 1}`;

            isValid = true;
            continue traverse;
          }

          // diagonal bottom left
          if (
            row + 1 < grid.length &&
            col - 1 > 0 &&
            symbolP2.includes(grid[row + 1][col - 1])
          ) {
            matchedSymbolPos = `${row + 1},${col - 1}`;

            isValid = true;
            continue traverse;
          }

          // diagonal top right
          if (
            row - 1 > 0 &&
            col + 1 < grid[row].length &&
            symbolP2.includes(grid[row - 1][col + 1])
          ) {
            matchedSymbolPos = `${row - 1},${col + 1}`;

            isValid = true;

            continue traverse;
          }

          // diagonal top left
          if (
            row - 1 > 0 &&
            col - 1 > 0 &&
            symbolP2.includes(grid[row - 1][col - 1])
          ) {
            matchedSymbolPos = `${row - 1},${col - 1}`;

            isValid = true;
            continue traverse;
          }

          // bottom
          if (row + 1 < grid.length && symbolP2.includes(grid[row + 1][col])) {
            matchedSymbolPos = `${row + 1},${col}`;

            isValid = true;
            continue traverse;
          }

          // left
          if (col - 1 > 0 && symbolP2.includes(grid[row][col - 1])) {
            matchedSymbolPos = `${row},${col - 1}`;

            isValid = true;
            continue traverse;
          }

          // right
          if (
            col + 1 < grid[row].length &&
            symbolP2.includes(grid[row][col + 1])
          ) {
            matchedSymbolPos = `${row},${col + 1}`;

            isValid = true;
            continue traverse;
          }

          break adjacent;
        }
      }
    }
  }

  nums.forEach((numArr) => {
    if (numArr.length > 1) {
      sum += numArr.reduce((acc, curr) => {
        return acc * curr;
      }, 1);
    }
  });

  console.log({ sum });
}

main();
