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

describe('branchIf function', () => {
  describe('with runIfTrue and runIfFalse functions', () => {
    it('will call the runIfTrue function if predicate return true', () => {
      const runIfTrue = () => 1
      const runIfFalse = () => 2
      const predicate = () => true
      const state = 0
      expect(branchIf(predicate, runIfTrue, runIfFalse)(0)).toBe(1)
    })
    it('will call the runIfFalse function if predicate return false', () => {
      const runIfTrue = () => 1
      const runIfFalse = () => 2
      const predicate = () => false
      const state = 0
      expect(branchIf(predicate, runIfTrue, runIfFalse)(0)).toBe(2)
    })
  })

  describe('with only runIfTrue function', () => {
    it('will call the runIfTrue function if predicate return true', () => {
      const runIfTrue = () => 1
      const predicate = () => true
      const state = 0
      expect(branchIf(predicate, runIfTrue)(0)).toBe(1)
    })
    it('will return state if predicate return false', () => {
      const runIfTrue = () => 1
      const predicate = () => false
      const state = 0
      expect(branchIf(predicate, runIfTrue)(0)).toBe(0)
    })
  })
})
