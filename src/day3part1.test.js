function calculatePowerConsumption(diagnosticReport) {
  const binaryNumbers = diagnosticReport.split("\n");
  let gamma = "";

  for (let x = 0; x < binaryNumbers[0].length; x++) {
    let nbOfZeroes = 0;
    let nbOfOnes = 0;

    binaryNumbers.forEach((bn) => {
      if (+bn.split("")[x] === 0) nbOfZeroes++;
      else nbOfOnes++;
    });

    if (nbOfZeroes > nbOfOnes) gamma += "0";
    else gamma += "1";
  }

  const epsilon = episolonFrom(gamma);

  const decimalGamma = parseInt(gamma, 2);
  const decimalEpsilon = parseInt(epsilon, 2);

  return decimalGamma * decimalEpsilon;

  function episolonFrom(gamma) {
    let episolon = "";
    gamma.split("").forEach((c) => {
      episolon += c === "0" ? "1" : "0";
    });
    return episolon;
  }
}

test.each([
  [
    "00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010",
    198,
  ],
])("%p > %p", (diagnosticReport, result) => {
  expect(calculatePowerConsumption(diagnosticReport)).toBe(result);
});
