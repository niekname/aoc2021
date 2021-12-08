const { chunk, last, first, drop, filter, zip } = require("lodash");
const GRID_SIZE = 5;

function bingo(input) {
  let { numbersToDraw, boards } = parseInput();
  let { lastNumberDrawn, lastWinningBoard } = playBingo(numbersToDraw, boards);
  return lastNumberDrawn * sumOfNonMarkedNumbersFrom(lastWinningBoard);

  function playBingo(numbersToDraw, boards) {
    const drawnNumber = first(numbersToDraw);
    const markedBoards = markOnBoards(drawnNumber, boards);
    const remainingBoards = removeWinningBoards(markedBoards);
    if (allBoardsHaveWon(remainingBoards))
      return {
        lastNumberDrawn: drawnNumber,
        lastWinningBoard: last(markedBoards),
      };
    else return playBingo(drop(numbersToDraw, 1), remainingBoards);
  }

  function sumOfNonMarkedNumbersFrom(board) {
    return board.filter((n) => n !== -1).reduce((a, b) => a + b);
  }

  function removeWinningBoards(boards) {
    return filter(boards, (board) => !boardHasWon(board));
  }

  function allBoardsHaveWon(boards) {
    return boards.length === 0;
  }

  function markOnBoards(drawnNumber, boards) {
    return boards.map((board) =>
      board.map((numberOnBoard) =>
        numberOnBoard === drawnNumber ? -1 : numberOnBoard
      )
    );
  }

  function boardHasWon(board) {
    return hasWinningRow(board) || hasWinningColumn(board);
  }

  function hasWinningRow(board) {
    return chunk(board, GRID_SIZE).find(allMarked);
  }

  function hasWinningColumn(board) {
    const rows = chunk(board, GRID_SIZE);
    const columns = zip(...rows);
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
  expect(bingo(input)).toBe(1924);
});
