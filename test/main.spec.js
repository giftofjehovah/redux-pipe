const { pipe, branchIf, selector, selectorPipe } = require('../src/index')

describe('pipe function', () => {
  it('will return a new state that is applied with mutations', () => {
    const state = 0
    const addOne = state => state + 1
    const addTwo = state => state + 2
    const addThree = state => state + 3
    expect(pipe([addOne, addTwo, addThree], state)).toBe(6)
  })
  it('will throw an error if firstParam is not array', () => {
    expect(() => pipe(1)).toThrow(
      new Error('First parameter of pipe must be an array')
    )
  })
})
