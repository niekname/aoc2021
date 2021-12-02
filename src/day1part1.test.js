function measureDepth(measurements) {
  return measurements.reduce((result, currentValue, currentIndex, arr) => {
    return isNotFirst() && isIncreased() ? ++result : result;

    function isNotFirst() {
      return currentIndex > 0;
    }

    function isIncreased() {
      return currentValue > arr[currentIndex - 1];
    }
  }, 0);
}

test.each([
  [[], 0],
  [[199], 0],
  [[199, 200], 1],
  [[199, 200, 208], 2],
  [[199, 200, 208, 210, 200, 207, 240, 269, 260, 263], 7],
])("%p > %p", (measurements, result) => {
  expect(measureDepth(measurements)).toBe(result);
});
