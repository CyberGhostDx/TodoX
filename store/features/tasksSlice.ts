import { Task, TaskCategories } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { produce } from "immer"

const initialState: TaskCategories = []

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTask: (state, action: PayloadAction<TaskCategories>) => {
      return action.payload
    },
    addTask: (
      state,
      action: PayloadAction<{ category: string; task: Task }>,
    ) => {
      const { category: categoryName, task } = action.payload
      const nextState = produce(state, (draftState) => {
        const index = draftState.findIndex((c) => c.name == categoryName)
        draftState[index].tasks.push(task)
      })
      return nextState
    },
    deleteTask: (
      state,
      action: PayloadAction<{ category: string; taskID: string }>,
    ) => {
      const { category: categoryName, taskID } = action.payload
      const nextState = produce(state, (draftState) => {
        const categoryIndex = draftState.findIndex(
          (c) => c.name == categoryName,
        )
        draftState[categoryIndex].tasks = draftState[
          categoryIndex
        ].tasks.filter((task) => task.id != taskID)
      })
      return nextState
    },
    editTask: (
      state,
      action: PayloadAction<{ category: string; task: Task }>,
    ) => {
      const { category: categoryName, task } = action.payload
      const nextState = produce(state, (draftState) => {
        const categoryIndex = draftState.findIndex(
          (c) => c.name == categoryName,
        )
        const taskIndex = draftState[categoryIndex].tasks.findIndex(
          (c) => c.id == task.id,
        )
        draftState[categoryIndex].tasks[taskIndex] = task
      })
      return nextState
    },
    setTaskDone: (
      state,
      action: PayloadAction<{ category: string; taskID: string }>,
    ) => {
      const { category: categoryName, taskID } = action.payload
      const nextState = produce(state, (draftState) => {
        const categoryIndex = draftState.findIndex(
          (c) => c.name == categoryName,
        )
        const taskIndex = draftState[categoryIndex].tasks.findIndex(
          (t) => t.id == taskID,
        )
        draftState[categoryIndex].tasks[taskIndex].done =
          !draftState[categoryIndex].tasks[taskIndex].done
      })
      return nextState
    },
    setTaskStarred: (
      state,
      action: PayloadAction<{ category: string; taskID: string }>,
    ) => {
      const { category: categoryName, taskID } = action.payload
      const nextState = produce(state, (draftState) => {
        const categoryIndex = draftState.findIndex(
          (c) => c.name == categoryName,
        )
        const taskIndex = draftState[categoryIndex].tasks.findIndex(
          (t) => t.id == taskID,
        )
        draftState[categoryIndex].tasks[taskIndex].starred =
          !draftState[categoryIndex].tasks[taskIndex].starred
      })
      return nextState
    },
    addCategory: (state, action: PayloadAction<string>) => {
      const categoryName = action.payload
      const nextState = [...state, { name: categoryName, tasks: [] }]
      return nextState
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      const categoryName = action.payload
      const nextState = [...state].filter((c) => c.name != categoryName)
      return nextState
    },
    editCategory: (
      state,
      action: PayloadAction<{ oldName: string; newName: string }>,
    ) => {
      const { oldName, newName } = action.payload
      const nextState = produce(state, (draftState) => {
        const categoryIndex = draftState.findIndex((c) => c.name == oldName)
        draftState[categoryIndex].name = newName
      })
      return nextState
    },
  },
})

export const {
  setTask,
  addTask,
  deleteTask,
  editTask,
  setTaskDone,
  setTaskStarred,
  addCategory,
  deleteCategory,
  editCategory,
} = tasksSlice.actions

export default tasksSlice.reducer
