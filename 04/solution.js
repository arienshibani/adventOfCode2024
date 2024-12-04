// Read the input file
var fs = require("fs");
const file = fs.readFileSync("./input.txt", "utf8");

// Convert the input file into a 2D array.
const grid = file.split("\n").map((row) => row.split(""));

/**
 * Find all the instances of the word XMAS in the grid.
 * @param {string[][]} grid - The grid to search.
 * @returns {number} - The number of times the word XMAS appears in the grid.
 */
const findXMAS = (grid) => {
    const word = "XMAS";

    let count = 0;
    const rows = grid.length;
    const cols = grid[0].length;

    // Direction vectors for all 8 directions
    const directions = [
        [-1, -1], [-1, 0], [-1, 1], // up-left, up, up-right
        [0, -1], [0, 1],  // left, right
        [1, -1], [1, 0], [1, 1]   // down-left, down, down-right
    ];

    // Check each cell as a potential starting point
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Try each direction from this cell
            for (const [x, y] of directions) {
                let matches = true;
                // Check if word fits in this direction
                for (let i = 0; i < word.length; i++) {
                    const newRow = row + (x * i);
                    const newCol = col + (y * i);

                    // Check if the new row and column are within the grid bounds
                    if (newRow < 0 || newRow >= rows ||
                        newCol < 0 || newCol >= cols ||
                        // Check if the current letter matches the expected letter
                        grid[newRow][newCol] !== word[i]) {
                        matches = false;
                        break;
                    }
                }
                if (matches) count++;
            }
        }
    }

    return count;
}

/**
 * Find all the instances of the word MAS in the grid in the shape of an X.
 * @param {string[][]} grid - The grid to search.
 * @returns {number} - The number of times the word MAS appears in the grid in an X shape.
 */
const findMASInXShape = (grid) => {
    let count = 0;

    // Check each cell as a potential center of the X
    grid.slice(1, -1).forEach((row, rowIndex) => {
        row.slice(1, -1).forEach((_, colIndex) => {
            // Adjust indices to account for slice offset
            const r = rowIndex + 1;
            const c = colIndex + 1;

            // Check if center is 'A'
            if (grid[r][c] !== 'A') return;

            // Check both diagonals for 'MAS' or 'SAM'
            const topLeft = grid[r - 1][c - 1];
            const topRight = grid[r - 1][c + 1];
            const bottomLeft = grid[r + 1][c - 1];
            const bottomRight = grid[r + 1][c + 1];

            // Check if either diagonal forms a valid MAS/SAM pattern
            const isValidDiagonal1 =
                (topLeft === 'M' && bottomRight === 'S') ||
                (topLeft === 'S' && bottomRight === 'M');

            const isValidDiagonal2 =
                (topRight === 'M' && bottomLeft === 'S') ||
                (topRight === 'S' && bottomLeft === 'M');

            if (isValidDiagonal1 && isValidDiagonal2) {
                count++;
            }
        });
    });

    return count;
}

// Task 1: Find all the instances of the word XMAS in the grid.
const result = findXMAS(grid);
console.log(`Found XMAS ${result} times in the grid 🎄`);

// Task 2: Find all the instances of the word MAS in the grid in the shape of an X.
const masResult = findMASInXShape(grid);
console.log(`Found MAS in X shape ${masResult} times in the grid ❌`);

