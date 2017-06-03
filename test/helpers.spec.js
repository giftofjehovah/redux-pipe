import { isFirstParamArray, reduceState, areAllFunctions } from '../src/helpers'

describe('isFirstParamArray function', () => {
  it('will return an error if param is an object', () => {
    expect(isFirstParamArray({})).toBeInstanceOf(Error)
  })
  it('will return an error if param is an number', () => {
    expect(isFirstParamArray(1)).toBeInstanceOf(Error)
  })
  it('will return an error if param is an string', () => {
    expect(isFirstParamArray('test')).toBeInstanceOf(Error)
  })
  it('will return an error if param is an boolean', () => {
    expect(isFirstParamArray(false)).toBeInstanceOf(Error)
  })
  it('will return an error if param is a function', () => {
    const mockFunction = () => {}
    expect(isFirstParamArray(mockFunction)).toBeInstanceOf(Error)
  })
  it('will return an error if param is empty', () => {
    expect(isFirstParamArray()).toBeInstanceOf(Error)
  })
  it('will return false if param is array', () => {
    expect(isFirstParamArray([])).toBe(false)
  })
})

describe('areAllFunctions function', () => {
  it('will return an error if param is an array of functions', () => {
    expect(areAllFunctions([1, 2])).toBeInstanceOf(Error)
  })
  it('will return an false if param is an array of functions', () => {
    const mockFunction = () => {}
    expect(areAllFunctions([mockFunction, mockFunction])).toBe(false)
  })
})

describe('reduceState function', () => {
  it('will return a new state that is applied with mutations', () => {
    const state = 0
    const addOne = state => state + 1
    const addTwo = state => state + 2
    const addThree = state => state + 3
    expect(reduceState([addOne, addTwo, addThree], state)).toBe(6)
  })
})
