import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { produce } from "immer"
import { Tag } from "@/types"

const initialState: Tag[] = []

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setTag: (state, action: PayloadAction) => {
      return action.payload
    },
    addTag: (state, action: PayloadAction<Tag>) => {
      const newTag = action.payload
      const nextState = [...state, newTag]
      return nextState
    },
    deleteTag: (state, action: PayloadAction<string>) => {
      const tagName = action.payload
      const nextState = [...state].filter((t) => t.name != tagName)
      return nextState
    },
    editTag: (state, action: PayloadAction<Tag>) => {
      const { name: tagName, color: tagColor } = action.payload
      const nextState = produce(state, (drafState) => {
        const tagIndex = drafState.findIndex((t) => t.name == tagName)
        drafState[tagIndex].name = tagName
        drafState[tagIndex].color = tagColor
      })
      return nextState
    },
  },
})

export const { setTag, addTag, deleteTag, editTag } = tagsSlice.actions

export default tagsSlice.reducer
