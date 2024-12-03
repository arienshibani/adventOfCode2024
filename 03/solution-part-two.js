// Read the input file
var fs = require("fs");
const file = fs.readFileSync("./input.txt", "utf8");

const mulFunctions = /(mul\(([0-9]*),([0-9]*)\))/g
const found = file.match(mulFunctions)

/**
 *  Use regular expressions to match all non-corrupt mul() functions from the instruction set.
 *
 * @param {string} mulFunction
 * @returns {number}
 */
const parseMulFunction = (mulFunction) => {
    const params = mulFunction.match(/([0-9]*)/g).filter(el => el.length !== 0)
    return params[0] * params[1]
}

// Parse the list of regex matches, and add them all up.
const listOfMultiplications = found.map(el => { return parseMulFunction(el) });
const sum = listOfMultiplications.reduce((acc, curr) => acc + curr, 0);

console.log("The sum of all multiplications are:", sum);