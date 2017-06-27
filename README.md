redux-pipe
-----

redux-pipe is a simple Redux utility function to enable you to write more declarative code in your reducer by allowing logic to be abstracted and reuse if necessary.

```
npm install redux-pipe
```
or
```
yarn add redux-pipe
```

## How to use redux-pipe?

You can use redux-pipe to change this:

```js
export default function rootReducer (state, action) {
  switch (action.type) {
    case ADD_TO_FIVE:

  }
}
```

to this:

```js
export default function rootReducer (state, action) {
  switch (action.type) {
    case ADD_TO_FIVE:

  }
}
```
