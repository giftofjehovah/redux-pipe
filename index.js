const { isImmutable } = require('immutable')
const {
  isFirstParamArray,
  reduceState,
  areAllFunctions
} = require('./helpers.js')

const pipe = (arrayOfMutators, state) => {
  const errorInFirstParam = isFirstParamArray(arrayOfMutators)
  if (errorInFirstParam) throw errorInFirstParam
  return isImmutable(state)
    ? state.withMutations(s => reduceState(arrayOfMutators, s))
    : reduceState(arrayOfMutators, state)
}

const branchIf = (predicate, runIfTrue, runIfFalse) => state => {
  const errorInAllParams = areAllFunctions([predicate, runIfTrue, runIfFalse])
  if (errorInAllParams) throw errorInAllParams
  if (runIfFalse) return predicate(state) ? runIfTrue(state) : runIfFalse(state)
  return predicate(state) ? runIfTrue(state) : state
}

const selector = (reducer, state, action, globalMutators = []) => {
  return reducer[action.type]
    ? [...reducer[action.type](action), ...globalMutators]
    : reducer.DEFAULT
}

const selectorPipe = (reducer, state, action, globalMutators = []) => {
  return reducer[action.type]
    ? pipe([...reducer[action.type](action), ...globalMutators])
    : reducer.DEFAULT
}

module.exports = {
  pipe,
  branchIf,
  selector,
  selectorPipe
}
