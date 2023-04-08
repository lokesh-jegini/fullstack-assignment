import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: "Todos",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push(action.payload)
    },
    remove: (state, action) => {
      state.splice(action.payload, 1)
    }
  }
})

export default todoSlice;

export const todoActions = todoSlice.actions;