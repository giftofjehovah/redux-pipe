import { pipe, branchIf, selector, selectorPipe } from '../src/index'

describe('pipe function', () => {
  it('will return a new state that is applied with mutations', () => {
    const state = 0
    const addOne = state => state + 1
    const addTwo = state => state + 2
    const addThree = state => state + 3
    expect(pipe([addOne, addTwo, addThree], state)).toBe(6)
  })
  it('will throw an error if firstParam is not array', () => {
    expect(() => pipe(1)).toThrow(new Error('First parameter of pipe must be an array'))
  })
})

describe('branchIf function', () => {
  describe('with runIfTrue and runIfFalse functions', () => {
    const returnIfTrue = () => 1
    const returnIfFalse = () => 2
    const state = 0
    it('will return the returnIfTrue function if predicate return true', () => {
      const predicate = () => true
      expect(branchIf(predicate, returnIfTrue, returnIfFalse)(state)).toBe(1)
    })
    it('will return the returnIfFalse function if predicate return false', () => {
      const predicate = () => false
      expect(branchIf(predicate, returnIfTrue, returnIfFalse)(state)).toBe(2)
    })
  })

  describe('with only runIfTrue function', () => {
    const returnIfTrue = () => 1
    const state = 0
    it('will return the returnIfTrue function if predicate return true', () => {
      const predicate = () => true
      expect(branchIf(predicate, returnIfTrue)(state)).toBe(1)
    })
    it('will return state if predicate return false', () => {
      const predicate = () => false
      expect(branchIf(predicate, returnIfTrue)(state)).toBe(0)
    })
  })

  describe('is able to handle array of mutators', () => {
    const addOne = state => state + 1
    const addTwo = state => state + 2
    const minusOne = state => state - 1
    const minusTwo = state => state - 2
    const state = 0
    it('will return the 3 value if predicate return true', () => {
      const predicate = () => true
      expect(branchIf(predicate, [addOne, addTwo], [minusOne, minusTwo])(state)).toBe(3)
    })
    it('will return the -3 value if predicate return true', () => {
      const predicate = () => false
      expect(branchIf(predicate, [addOne, addTwo], [minusOne, minusTwo])(state)).toBe(-3)
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
