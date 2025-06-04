const { createIncompleteWord } = require('../challenge2');

test('createIncompleteWord returns string of same length with underscores or original letters', () => {
  const word = 'testing';
  const result = createIncompleteWord(word);
  expect(result).toHaveLength(word.length);
  expect(result.split('').every((ch, idx) => ch === '_' || ch === word[idx])).toBe(true);
});
