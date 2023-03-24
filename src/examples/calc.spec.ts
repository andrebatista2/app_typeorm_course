export function add(x: number, y: number) {
  return x + y;
}

describe(`Should return sum from 2 numbers`, () => {
  test('test add function', () => {
    expect(add(2, 2)).toEqual(4);
  });
})
