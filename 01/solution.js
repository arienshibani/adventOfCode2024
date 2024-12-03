// Read the input file
const fs = require("fs");
const file = fs.readFileSync("./input.txt", "utf8");
let distance = 0;


/**
 * Part 1: Distance between the two lists
 */

//Split the .txt file into two lists and sort them.
const [listOne, listTwo] = file.split('\n').reduce((acc, line) => {
    const [left, right] = line.split('   ');
    acc[0].push(Number(left));
    acc[1].push(Number(right));
    return acc;
}, [[], []]).map(list => list.sort((a, b) => a - b));

// Sort left + right lists
listOne.sort((a, b) => a - b);
listTwo.sort((a, b) => a - b);

// Calculate distance
for (let i = 0; i < listOne.length; i++) {
    distance += Math.abs(listOne[i] - listTwo[i]);
}


/**
 * Part 2: Similarity between the two lists
 */

let similarity = 0;
// Count the occurance of each value in the left list, in the right list
const listOneCount = [];

// Create a frequency map.
const rightFreq = listTwo.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
}, {});

for (const value of listOne) {
    listOneCount.push(value * (rightFreq[value] || 0));
}

// Add up all numbers in the listOneCount array
for (const value of listOneCount) {
    similarity += value;
}


// Output the answers to both part 1 and part 2 in the console with headers.
console.table([
    { Metric: "Part 1: Distance", Value: distance },
    { Metric: "Part 2: Similarity", Value: similarity }
]);

