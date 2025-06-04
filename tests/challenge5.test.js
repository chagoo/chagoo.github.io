const shuffle = require('../challenge5');

test('shuffle returns array with same length and elements', () => {
  const input = [1, 2, 3, 4, 5];
  const copy = [...input];
  const result = shuffle(copy);
  // same length
  expect(result.length).toBe(input.length);
  // same elements (ignoring order)
  expect(result.sort()).toEqual([...input].sort());
});
