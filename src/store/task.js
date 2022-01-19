import { createAction, createSlice } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'
import { setError } from './errors'

const initialState = {
  entities: [],
  isLoading: true
}

//createSlice
const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    recieved(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      )
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload
      }
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      )
    },
    taskAdded(state, action) {
      state.entities.unshift(action.payload)
    },
    loadTasksRequested(state) {
      state.isLoading = true
    },
    taskRequestFailed(state, action) {
      state.isLoading = false
    }
  }
})

//actionTypes
const { actions, reducer: taskReducer } = taskSlice
const {
  update,
  remove,
  recieved,
  taskAdded,
  loadTasksRequested,
  taskRequestFailed
} = actions

const taskRequested = createAction('task/taskRequested')

export const loadTasks = () => async (dispatch) => {
  dispatch(loadTasksRequested())
  try {
    const data = await todosService.fetch()
    dispatch(recieved(data))
  } catch (error) {
    dispatch(taskRequestFailed())
    dispatch(setError(error.message))
  }
}

//actions with thunk
export const completeTask =
  (id) => (dispatch, getState) => {
    dispatch(update({ id, completed: true }))
  }

export function titleChanged(id) {
  return update({
    id,
    title: `New title for ${id}`
  })
}

export function taskDeleted(id) {
  return remove({ id })
}

export const createTask = (task) => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.create(task)
    dispatch(taskAdded(data))
  } catch (error) {
    dispatch(taskRequestFailed())
    dispatch(setError(error.message))
  }
}

//selectors
export const getTasks = () => (state) =>
  state.tasks.entities

export const getTasksLoadingStatus = () => (state) =>
  state.tasks.isLoading

export default taskReducer
