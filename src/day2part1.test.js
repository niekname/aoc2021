function dive(course) {
  let horizontalPosition = 0;
  let depth = 0;

  const commands = course.split("\n");
  commands.forEach((c) => {
    let direction = c.split(" ")[0];
    let amount = +c.split(" ")[1];

    if (direction === "forward") horizontalPosition += amount;
    if (direction === "down") depth += amount;
    if (direction === "up") depth -= amount;
  });

  return horizontalPosition * depth;
}

test.each([["forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2", 150]])(
  "%p > %p",
  (course, result) => {
    expect(dive(course)).toBe(result);
  }
);
