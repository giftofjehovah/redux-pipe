const { isImmutable } = require('immutable')
const { isFirstParamArray, reduceState } = require('./helpers.js')

const pipe = (arrayOfMutators, state) => {
  const errorInFirstParam = isFirstParamArray(arrayOfMutators)
  if (errorInFirstParam) throw errorInFirstParam
  return isImmutable(state)
    ? state.withMutations(s => reduceState(arrayOfMutators, s))
    : reduceState(arrayOfMutators, state)
}

module.exports = {
  pipe
}
