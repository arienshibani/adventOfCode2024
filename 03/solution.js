var fs = require("fs");

// Read the input file
const file = fs.readFileSync("./input.txt", "utf8");
const mulFunctions = /(mul\(([0-9]*),([0-9]*)\))/g
const found = file.match(mulFunctions)

const parseMulFunction = (mulFunction) => {
    const params = mulFunction.match(/([0-9]*)/g).filter(el => el.length !== 0)
    return params[0] * params[1]
}

const listOfMultiplications = found.map(el => { return parseMulFunction(el) });
const sum = listOfMultiplications.reduce((acc, curr) => acc + curr, 0);

console.log("The total sum of all the multiplications are:", sum);