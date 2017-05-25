const isFirstParamArray = arrayOfMutators =>
  Array.isArray(arrayOfMutators)
    ? false
    : new Error('First parameter of pipe must be an array')

const reduceState = (arrayOfMutators, state) =>
  arrayOfMutators.reduce((state, mutator) => mutator(state), state)

const areAllFunctions = arrayOfFunctions =>
  arrayOfFunctions.every(func => typeof func === 'function')
    ? false
    : new Error('All parameters of branchIf must be functions')

module.exports = {
  isFirstParamArray,
  reduceState,
  areAllFunctions
}
