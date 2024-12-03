// Read the input file
var fs = require("fs");
const file = fs.readFileSync("./input.txt", "utf8");

// Use regular expressions to match all non-corrupt mul(), do() and don't() functions from the instruction set.
const allValidInstructions = /(mul\(([0-9]*),([0-9]*)\))|(do\(\)|don't\(\))/g
const found = file.match(allValidInstructions)


// Controls's wether or not the mul() functions should do anything.
let isMulEnabled = true; // Defaults to true

/**
 *  Use regular expressions to parse the parameters of a mul() function, and do the math.
 *
 * @param {string} mulFunction
 * @returns {number} The multiplied value of the params.
 */
const parseMulFunction = (mulFunction) => {
    const params = mulFunction.match(/([0-9]*)/g).filter(el => el.length !== 0)
    if (!params.length) {
        return 0
    }
    return Number.parseInt(params[0]) * Number.parseInt(params[1])
}

let sum = 0;
for (const instruction of found) {
    if (instruction === "don't()") {
        isMulEnabled = false
    }

    if (instruction === "do()") {
        isMulEnabled = true
    }

    if (isMulEnabled) {
        sum += parseMulFunction(instruction)
    }
}

console.log("The sum of all multiplications are:", sum);