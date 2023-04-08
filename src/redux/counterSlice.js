import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'Counter',
  initialState: {
    count: 1
  },
  reducers: {
    increment: (state, action) => {
      state.count += action.payload || 1
    },
    decrement: (state, action) => {
      state.count -= 1
    },
  }
})

// counterSlice = { reducer: reducerFuntion, actions: allActionsDefinedInsideReducersAsObj }
/**
 * counterSlice = {
 *  reducer: function
 *  actions: {
 *    increment: (obj) => {},
 *    decrement: (obj) => {}
 *  }
 * }
 */

export const counterActions = counterSlice.actions

export default counterSlice;
