import {
  // createAction,
  // createReducer,
  createSlice
} from '@reduxjs/toolkit'

const initialState = [
  { id: 1, title: 'Task1', completed: false },
  { id: 2, title: 'Task2', completed: false }
]

//actionTypes
// const update = createAction('task/updated')
// const remove = createAction('task/removed')

//createSlice
const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    update(state, action) {
      const elementIndex = state.findIndex(
        (el) => el.id === action.payload.id
      )
      state[elementIndex] = {
        ...state[elementIndex],
        ...action.payload
      }
    },
    remove(state, action) {
      return state.filter(
        (el) => el.id !== action.payload.id
      )
    }
  }
})

const { actions, reducer: taskReducer } = taskSlice
const { update, remove } = actions

//actions
export function taskCompleted(id) {
  return update({ id, completed: true })
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

//Reducer
// const taskReducer = createReducer(
//   initialState,
//   (builder) => {
//     builder
//       .addCase(update, (state, action) => {
//         const elementIndex = state.findIndex(
//           (el) => el.id === action.payload.id
//         )
//         state[elementIndex] = {
//           ...state[elementIndex],
//           ...action.payload
//         }
//       })
//       .addCase(remove, (state, action) => {
//         return state.filter(
//           (el) => el.id !== action.payload.id
//         )
//       })
//   }
// )
export default taskReducer
