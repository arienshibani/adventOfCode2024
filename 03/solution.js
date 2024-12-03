var fs = require("fs");

// Read the input file
const file = fs.readFileSync("./input.txt", "utf8");
const mulFunctions = /(mul\(([0-9]*),([0-9]*)\))/g
const found = file.match(mulFunctions)


const parseMulFunction = (mulFunction) => {
    const params = mulFunction.match(/([0-9]*)/g)
    return params[0] * params[1]

}

const result = found.map(el => parseMulFunction(el))

let sum;
for (const number in result) {
    sum += number
}

console.log(sum);