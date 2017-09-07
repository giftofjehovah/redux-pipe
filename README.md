redux-pipe
-----

redux-pipe is a simple utility function to enable you to write more declarative code in your redux reducer by allowing logic to be abstracted and reuse if necessary. 

```
npm install redux-pipe
```
or
```
yarn add redux-pipe
```

## How to use redux-pipe?


### `pipe()`
The `pipe` function take in an array of functions called **mutators** and the current state to create the next state.

```js
pipe(mutators: Array<Function>, currentState): nextState
```
Mutator are functions that take in a redux action that returns another function that accept the state as its parameter. The last function will compute the next state and return it for the next mutator.
```js
// mutators
const stopLoader = () => state => ({...state, isLoading: false})
const setData = action => state => ({...state, data: action.payload.data})
```
This is how we can use them in our reducer. The following example is how you can stop loading spinner and set the data to the state with one action.

```js
//reducer
import {pipe} from 'redux-pipe'

export default function rootReducer (state, action) {
  switch (action.type) {
  	case 'GET_DATA_SUCCESS':
      return pipe([stopLoading(), setData(action)], state)
  }
}
```
## Additonal helper functions
### `branchIf()`
The `branchIf` function take in a predicate as its first parameter. 
It will return the mutators in second parameter if the predicate returns true.
It will return the mutators in third parameter if the predicate returns false.
```js
branchIf(predicate: Function, trueMutator: Function | trueMutators:Array<Function>, falseMutator: Function | falseMutators:Array<Function>)
```
This is how we can use them in our reducer. The following example is how you can stop loading a spinner and use the mutator `setToy` or `setMakeup` according to what our predicate returns.
```js
// predicate
const isMale = action => state => action.payload.gender === 'M'

// mutators
const stopLoader = () => state => ({...state, isLoading: false})
const setToy = action => state => ({...state, toy: action.payload.item})
const setMakeup = action => state => ({...state, makeup: action.payload.item})

// reducer
import {pipe, branchIf} from 'redux-pipe'

export default function rootReducer (state, action) {
  switch (action.type) {
    case 'SET_ITEM':
      return pipe([
        stopLoader(),
        branchIf(isMale(action), setToy(action), setMakeup(action))
      ], state)
  }
}
```
