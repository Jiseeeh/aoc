const getReader = require("../../reader.js");

async function p1() {
    const rl = getReader("input.txt");

    const left = [];
    const right = [];

    for await (const line of rl) {
        const lineParts = line.trim().split(/\s+/);

        left.push(lineParts[0]);
        right.push(lineParts[1]);
    }

    left.sort();
    right.sort();

    let total = 0;
    for (let i = 0; i < left.length; i++) {
        total = total + (Math.abs(left[i] - right[i]));
    }

    console.log({total: total});
}

async function p2() {
    const rl = getReader("input.txt");

    const left = [];
    const right = [];

    for await (const line of rl) {
        const lineParts = line.trim().split(/\s+/);

        left.push(lineParts[0]);
        right.push(lineParts[1]);
    }

    const intersection = left.filter(value => right.includes(value));

    const reduced = right.reduce((acc, curr) => {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc;
    }, {});

    let total = 0;
    for (const i of intersection) {
        total += i * reduced[i];
    }

    console.log({total});
}

p1();
p2();