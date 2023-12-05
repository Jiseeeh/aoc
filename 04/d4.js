const fs = require("node:fs");
const getReader = require("../reader.js");

async function main() {
  const rl = getReader("./input.txt");

  let total = 0;

  for await (const line of rl) {
    total += getWinningPoints(line);
  }

  console.log({ p1: total });
  countScratchCards();
}

/**
 *
 * @param {string} line
 * @returns {number}
 * */
function getWinningPoints(line) {
  const cards = line.split(" | ");
  const winningNumbers = cards[0].split(/:\s+/)[1].split(/\s+/);
  const scratchNumbers = cards[1].split(/\s+/);

  let count = 0;

  for (const winningNumber of winningNumbers) {
    if (scratchNumbers.includes(winningNumber)) {
      count++;
    }
  }

  return Math.floor(2 ** (count - 1));
}

/**
 * @param {string} line
 */
function countScratchCards() {
  const input = fs.readFileSync("./input.txt", "utf8");
  const lines = input.split("\r\n");
  let allCards = Array(lines.length + 1).fill(1);
  allCards[0] = 0;

  for (let row = 0; row < lines.length; row++) {
    const line = lines[row];
    const { cardNumber, scratchNumbers, winningNumbers } = parseRow(line);

    let count = 0;
    winningNumbers.forEach((winningNumber) => {
      if (scratchNumbers.includes(winningNumber)) {
        count++;
      }
    });

    // add to count of each card
    for (let i = 1; i <= count; i++) {
      allCards[+cardNumber + i] += allCards[+cardNumber];
    }
  }

  let sum = 0;
  allCards.forEach((val) => {
    sum += val;
  });

  console.log({ p2: sum });
}

/**
 * @param {string} row
 * @returns {{cardNumber: number, winningNumbers: string[], scratchNumbers: string[]}}
 */
function parseRow(row) {
  const cards = row.split(/:\s+/);
  const cardNumber = cards[0].match(/\d+/)[0];
  const winningNumbers = cards[1].split(" | ")[0].split(/\s+/);
  const scratchNumbers = cards[1].split(" | ")[1].split(/\s+/);

  return {
    cardNumber,
    winningNumbers,
    scratchNumbers,
  };
}

main();
