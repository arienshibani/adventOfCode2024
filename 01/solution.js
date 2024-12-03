var fs = require("fs");

// Read the input file
const file = fs.readFileSync("./input.tsv", "utf8");

let distance = 0;
let leftList = [];
let rightList = [];

// Parse left + right lists
for (const line of file.split("\n")) {
    leftList.push(line.split("   ")[0]);
    rightList.push(line.split("   ")[1]);
}

// Sort left + right lists
leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

// Calculate distance
for (let i = 0; i < leftList.length; i++) {
    distance += Math.abs(leftList[i] - rightList[i]);
}
console.log("Distance:", distance);

let similarity = 0;
// Count the occurance of each value in the left list, in the right list
const leftCount = [];

for (const value of leftList) {
    leftCount.push(value * rightList.filter((number) => number === value).length);
}

// Add up all numbers in the leftCount array
for (const value of leftCount) {
    similarity += value;
}

console.log("Similarity:", similarity);