// import { createStore } from 'redux';
const { createStore } = require('redux');

function FunA() {
  console.log('A: Store Changed', store.getState())
}
function FunB() {
  console.log('B: Store Changed', store.getState())
}

// Global store - which can be accessed throughout the app
// STATE

// Actions - 

// Reducers - A function that takes the current state/store-data and an action and returns a new state

const todoReducer = (currentState={count:1}, action) => {
  console.log(action)
  if(action.type === 'INC') {
    return {
      count: currentState.count + (action.step || 1)
    }
  }
  if(action.type === 'DEC') {
    return {
      count: currentState.count - 1
    }
  }
  
  return currentState
}

const store = createStore(todoReducer) // current store value is { count: 1 }

console.log('INIT >> ', store.getState())

store.subscribe(FunA)
store.dispatch({ type: 'INC', step: 5 })
store.dispatch({ type: 'DEC' })

store.subscribe(FunB)

store.dispatch({ type: 'INC', step: 3 })
store.dispatch({ type: 'DEC' })
