import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: string[] = []

const categoryFilterSlice = createSlice({
  name: "catergoryFilter",
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<string>) => {
      const nextState = [...state]
      nextState.push(action.payload)
      return nextState
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      let nextState = [...state]
      nextState = nextState.filter((name) => name != action.payload)
      return nextState
    },
  },
})

export const { addFilter, removeFilter } = categoryFilterSlice.actions

export default categoryFilterSlice.reducer
