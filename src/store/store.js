import { createStore } from 'redux'
import taskReducer from './task'

//initializeStore

function configureStore() {
  return createStore(taskReducer)
}

export default configureStore
