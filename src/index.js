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
  const paramsToCheck = runIfFalse
    ? [predicate, runIfTrue, runIfFalse]
    : [predicate, runIfTrue]
  const errorInAllParams = areAllFunctions(paramsToCheck)
  if (errorInAllParams) throw errorInAllParams
  if (runIfFalse) return predicate(state) ? runIfTrue(state) : runIfFalse(state)
  return predicate(state) ? runIfTrue(state) : state
}

const selector = (reducer, action) =>
  reducer[action.type] ? reducer[action.type]() : reducer.DEFAULT()

const selectorPipe = (reducer, state, action, globalMutators = []) => {
  return reducer[action.type]
    ? pipe([...reducer[action.type](), ...globalMutators], state)
    : reducer.DEFAULT()
}

const createGroupMutator = (arrayOfMutators, action) => state =>
  arrayOfMutators
    .map(mutator => mutator(action))
    .reduce((state, mutator) => mutator(state), state)

module.exports = {
  pipe,
  branchIf,
  selector,
  selectorPipe
}
