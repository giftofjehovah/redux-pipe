import { isImmutable } from 'immutable'
import { isFirstParamArray, reduceState, areAllFunctions } from './helpers.js'

export const pipe = (arrayOfMutators, state) => {
  const errorInFirstParam = isFirstParamArray(arrayOfMutators)
  if (errorInFirstParam) throw errorInFirstParam
  return isImmutable(state)
    ? state.withMutations(s => reduceState(arrayOfMutators, s))
    : reduceState(arrayOfMutators, state)
}

export const branchIf = (predicate, runIfTrue, runIfFalse) => state => {
  const paramsToCheck = runIfFalse
    ? [predicate, runIfTrue, runIfFalse]
    : [predicate, runIfTrue]
  const errorInAllParams = areAllFunctions(paramsToCheck)
  if (errorInAllParams) throw errorInAllParams
  if (runIfFalse) return predicate(state) ? runIfTrue(state) : runIfFalse(state)
  return predicate(state) ? runIfTrue(state) : state
}

export const selector = (reducer, action) =>
  reducer[action.type] ? reducer[action.type](action) : reducer.DEFAULT()

export const selectorPipe = (reducer, state, action, globalMutators = []) => {
  return reducer[action.type]
    ? pipe([...reducer[action.type](action), ...globalMutators], state)
    : reducer.DEFAULT()
}

const createGroupMutator = (arrayOfMutators, action) => state =>
  arrayOfMutators
    .map(mutator => mutator(action))
    .reduce((state, mutator) => mutator(state), state)
