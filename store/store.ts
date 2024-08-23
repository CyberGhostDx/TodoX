import { configureStore } from "@reduxjs/toolkit"
import tasksReducer from "@/store/features/tasksSlice"
import categoryReducer from "@/store/features/categoryFilterSlice"
import tagsReducer from "@/store/features/tagsSlice"
import showReducer from "@/store/features/showSlice"

export const store = () => {
  return configureStore({
    reducer: {
      tasks: tasksReducer,
      categoryFilter: categoryReducer,
      tags: tagsReducer,
      show: showReducer,
    },
  })
}
export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
