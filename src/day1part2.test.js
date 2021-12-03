function measureDepth(measurements) {
  const groupedMeasures = measurements.reduce(
    (result, currentValue, currentIndex, arr) => {
      if (isFirst() || isLast()) return result;
      result.push(previousValue() + currentValue + nextValue());
      return result;

      function isFirst() {
        return currentIndex === 0;
      }

      function isLast() {
        return currentIndex === arr.length - 1;
      }

      function previousValue() {
        return arr[currentIndex - 1];
      }

      function nextValue() {
        return arr[currentIndex + 1];
      }
    },
    []
  );

  return groupedMeasures.reduce((result, currentValue, currentIndex, arr) => {
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
  [[199, 200], 0],
  [[199, 200, 208], 0],
  [[199, 200, 208, 300], 1],
  [[199, 200, 208, 301, 409], 2],
  [[199, 200, 208, 210, 200, 207], 1],
  [[199, 200, 208, 210, 200, 207, 240, 269, 260, 263], 5],
])("%p > %p", (measurements, result) => {
  expect(measureDepth(measurements)).toBe(result);
});
