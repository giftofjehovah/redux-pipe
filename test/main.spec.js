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
  it('will throw an error if any param is not a function', () => {
    const runIfTrue = () => 1
    const runIfFalse = () => 2
    const predicate = true
    expect(() => branchIf(predicate, runIfTrue, runIfFalse)(0)).toThrow(
      new Error('All parameters of branchIf must be functions')
    )
  })
  describe('with runIfTrue and runIfFalse functions', () => {
    const runIfTrue = () => 1
    const runIfFalse = () => 2
    const state = 0
    it('will call the runIfTrue function if predicate return true', () => {
      const predicate = () => true
      expect(branchIf(predicate, runIfTrue, runIfFalse)(0)).toBe(1)
    })
    it('will call the runIfFalse function if predicate return false', () => {
      const predicate = () => false
      expect(branchIf(predicate, runIfTrue, runIfFalse)(0)).toBe(2)
    })
  })

  describe('with only runIfTrue function', () => {
    const runIfTrue = () => 1
    const state = 0
    it('will call the runIfTrue function if predicate return true', () => {
      const predicate = () => true
      expect(branchIf(predicate, runIfTrue)(0)).toBe(1)
    })
    it('will return state if predicate return false', () => {
      const predicate = () => false
      expect(branchIf(predicate, runIfTrue)(0)).toBe(0)
    })
  })
})

describe('selectorPipe function', () => {
  const state = 0
  const addOne = action => state => state + 1
  const addTwo = action => state => state + 2
  const addThree = action => state => state + 3
  const addFour = action => state => state + 4

  it('will return a new state that is applied with mutations', () => {
    const action = { type: 'ADD' }
    const reducer = {
      ADD: () => [addOne(action), addTwo(action), addThree(action)],
      DEFAULT: () => state
    }
    expect(selectorPipe(reducer, state, action)).toBe(6)
  })
  it('will return a default state if action type does not match any key', () => {
    const action = { type: 'TIMES' }
    const reducer = {
      ADD: () => [addOne(action), addTwo(action), addThree(action)],
      DEFAULT: () => state
    }
    expect(selectorPipe(reducer, state, action)).toBe(0)
  })
  it('will apply globalMutators to the selector mutations', () => {
    const action = { type: 'ADD' }
    const reducer = {
      ADD: () => [addOne(action), addTwo(action), addThree(action)],
      DEFAULT: () => state
    }
    expect(selectorPipe(reducer, state, action, [addFour(action)])).toBe(10)
  })
})
