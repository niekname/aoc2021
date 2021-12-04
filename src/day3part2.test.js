const { partition } = require("lodash/collection");

function calculateLifeSupportRating(diagnosticReport) {
  const binaryNumbers = diagnosticReport.split("\n");
  return (
    getRating(binaryNumbers, oxygenBitCriteria) *
    getRating(binaryNumbers, co2BitCriteria)
  );

  function getRating(numbers, applyBitCriteria, bitPosition = 0) {
    const p = partition(numbers, (n) => n.charAt(bitPosition) === "0");
    const selected = applyBitCriteria(p[0], p[1]);
    return selected.length === 1
      ? parseInt(selected[0], 2)
      : getRating(selected, applyBitCriteria, ++bitPosition);
  }

  function co2BitCriteria(zeroes, ones) {
    return zeroes.length <= ones.length ? zeroes : ones;
  }

  function oxygenBitCriteria(zeroes, ones) {
    return ones.length >= zeroes.length ? ones : zeroes;
  }
}

test("example input", () => {
  const input =
    "00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010";
  expect(calculateLifeSupportRating(input)).toBe(230);
});
