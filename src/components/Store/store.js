import { configureStore } from '@reduxjs/toolkit'
import SearchReducer from "../slice/SearchSlice"
import SongReducer from "../slice/QueueSlice"
export const Store = configureStore({
    reducer: {
      Search :  SearchReducer,
      Songs : SongReducer,
    },
  })

