import { configureStore } from '@reduxjs/toolkit'
import { logger } from './middleware/logger'
import taskReducer from './task'

//initializeStore

function createStore() {
  return configureStore({
    reducer: taskReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production'
  })
}

export default createStore
