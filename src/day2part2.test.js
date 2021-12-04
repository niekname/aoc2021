function dive(course) {
  let aim = 0;
  let horizontalPosition = 0;
  let depth = 0;

  const commands = course.split("\n");
  commands.forEach((c) => {
    let direction = c.split(" ")[0];
    let units = +c.split(" ")[1];

    if (direction === "forward") {
      horizontalPosition += units;
      depth += aim * units;
    }
    if (direction === "down") aim += units;
    if (direction === "up") aim -= units;
  });

  return horizontalPosition * depth;
}

test.each([["forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2", 900]])(
  "%p > %p",
  (course, result) => {
    expect(dive(course)).toBe(result);
  }
);
