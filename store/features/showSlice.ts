import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ShowTask } from "@/types"

const initialState = "tasks" satisfies ShowTask as ShowTask

const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {
    setShow(state, action: PayloadAction<ShowTask>) {
      return action.payload
    },
  },
})

export const { setShow } = showSlice.actions

export default showSlice.reducer
