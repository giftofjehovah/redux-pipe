const isFirstParamArray = arrayOfMutators =>
  Array.isArray(arrayOfMutators)
    ? false
    : new Error('First parameter of pipe must be an array')

const reduceState = (arrayOfMutators, state) =>
  arrayOfMutators.reduce((state, mutator) => mutator(state), state)

module.exports = {
  isFirstParamArray,
  reduceState
}
