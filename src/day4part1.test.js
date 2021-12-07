const { takeWhile, chunk, find } = require("lodash");

function bingo(input) {
  const GRID_SIZE = 5;
  let { numbersToDraw, boards } = parseInput();

  let lastNumberDrawn;
  takeWhile(numbersToDraw, (drawnNumber) => {
    markOnBoards(drawnNumber);
    lastNumberDrawn = drawnNumber;
    return noWinnerYet();
  });

  return (
    lastNumberDrawn *
    getWinningBoard()
      .filter((n) => n !== -1)
      .reduce((a, b) => a + b)
  );

  function noWinnerYet() {
    return getWinningBoard() === undefined;
  }

  function markOnBoards(drawnNumber) {
    boards = boards.map((board) =>
      board.map((numberOnBoard) =>
        numberOnBoard === drawnNumber ? -1 : numberOnBoard
      )
    );
  }

  function getWinningBoard() {
    return find(
      boards,
      (board) => hasWinningRow(board) || hasWinningColumn(board)
    );
  }

  function hasWinningRow(board) {
    return chunk(board, GRID_SIZE).find(allMarked);
  }

  function hasWinningColumn(board) {
    const rows = chunk(board, GRID_SIZE);
    const columns = [...Array(GRID_SIZE)].map((_, colIdx) =>
      rows.map((row) => row[colIdx])
    );
    return !!columns.find(allMarked);
  }

  function allMarked(rowOrCol) {
    return rowOrCol.filter((n) => n !== -1).length === 0;
  }

  function parseInput() {
    const split = input.split("\n\n");
    const numbers = split[0].split(",").map((x) => +x);
    const boards = split.slice(1, split.length).map((b) =>
      b
        .replace(/\n/g, " ")
        .split(" ")
        .filter((n) => n !== "")
        .map((n) => +n)
    );

    return { numbersToDraw: numbers, boards };
  }
}

test("win by row", () => {
  const input =
    "3,99,15,0,2,22,99\n" +
    "\n" +
    "22 13 17 11  0\n" +
    " 8  2 23  4 24\n" +
    "\n" +
    " 3 15  0  2 22\n" +
    " 9 18 13 17  5";
  expect(bingo(input)).toBe(1364);
});

test("win by column", () => {
  const input =
    "13,99,2,99\n" +
    "\n" +
    "22 13 17 11  0\n" +
    " 8  2 23  4 24\n" +
    "\n" +
    " 3 15  0  2 22\n" +
    " 9 18 13 17  5";
  expect(bingo(input)).toBe(218);
});

test("example input", () => {
  const input =
    "7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1\n" +
    "\n" +
    "22 13 17 11  0\n" +
    " 8  2 23  4 24\n" +
    "21  9 14 16  7\n" +
    " 6 10  3 18  5\n" +
    " 1 12 20 15 19\n" +
    "\n" +
    " 3 15  0  2 22\n" +
    " 9 18 13 17  5\n" +
    "19  8  7 25 23\n" +
    "20 11 10 24  4\n" +
    "14 21 16 12  6\n" +
    "\n" +
    "14 21 17 24  4\n" +
    "10 16 15  9 19\n" +
    "18  8 23 26 20\n" +
    "22 11 13  6  5\n" +
    " 2  0 12  3  7";
  expect(bingo(input)).toBe(4512);
});
