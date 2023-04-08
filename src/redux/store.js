// To create a store, we need to have some reducer

import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counterSlice';
import todoSlice from './todoSlicer';

/**
 * Acts as a Global Store to the APP
 *  - Todos
 *  - Counter
 */

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    todos: todoSlice.reducer
  }
})

export default store;
