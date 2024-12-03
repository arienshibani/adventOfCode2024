var fs = require("fs");

// Read the input file
const file = fs.readFileSync("./input.ssv", "utf8");

const safeAdjacentDiff = (number1, number2) => {
    const diff = Math.abs(number1 - number2);
    // Must differ by at least one and at most three.
    return diff >= 1 && diff <= 3;
}

const allEitherIncreasingOrDecreasing = (line) => {
    const numbers = line.split(" ").map(Number);
    let isIncreasing = true;
    let isDecreasing = true;

    for (let i = 1; i < numbers.length; i++) {
        const diff = numbers[i] - numbers[i - 1];
        if (diff > 0) {
            isDecreasing = false;
        } else if (diff < 0) {
            isIncreasing = false;
        } else {
            // If diff is 0, neither increasing nor decreasing
            return false;
        }

        // Check adjacent difference
        if (!safeAdjacentDiff(numbers[i], numbers[i - 1])) {
            return false;
        }
    }

    return isIncreasing || isDecreasing;
}

// Main logic
let safeReports = 0;
const lines = file.trim().split("\n");

for (const line of lines) {
    if (allEitherIncreasingOrDecreasing(line)) {
        safeReports++;
    }
}

console.log(`Number of safe reports: ${safeReports}`);

