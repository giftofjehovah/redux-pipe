const { isImmutable } = require('immutable')
const { isFirstParamArray, reduceState } = require('./helpers.js')

const pipe = (arrayOfMutators, state) => {
  const errorInFirstParam = isFirstParamArray(arrayOfMutators)
  if (errorInFirstParam) throw errorInFirstParam
  return isImmutable(state)
    ? state.withMutations(s => reduceState(arrayOfMutators, s))
    : reduceState(arrayOfMutators, state)
}

const branchIf = (predicate, runIfTrue, runIfFalse) => state => {
  if (runIfFalse) return predicate(state) ? runIfTrue(state) : runIfFalse(state)
  return predicate(state) ? runIfTrue(state) : state
}

module.exports = {
  pipe,
  branchIf
}
