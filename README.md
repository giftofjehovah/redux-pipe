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
The pipe function take in an array of functions called **mutators** and the current state to create the next state.

```js
pipe(mutators: Array<Function>, currentState): nextState
```
Mutator are functions that take in a redux action that returns another function that accept the state as its parameter. The last function will compute the next state and return it for the next mutator.
```js
// mutators
const stopLoader = () => state => ({...state, isLoading: false})
const setData = action => state => ({...state, data: action.payload.data})
```
This is how we can use them in our reducer. The following example is how you can set a loading spinner to false and set the data to the state with one action.

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

