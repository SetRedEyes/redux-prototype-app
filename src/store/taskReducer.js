import { taskUpdated } from './actionTypes'
import { taskDeleted } from './actionTypes'
//Reducer
export function taskReducer(state = [], action) {
  switch (action.type) {
    case taskUpdated: {
      const newArray = [...state]
      const elementIndex = newArray.findIndex(
        (el) => el.id === action.payload.id
      )
      newArray[elementIndex] = {
        ...newArray[elementIndex],
        ...action.payload
      }
      return newArray
    }
    case taskDeleted: {
      const newArray = [...state]
      const updatedArray = newArray.filter(
        (el) => el.id !== action.payload.id
      )
      return updatedArray
    }
    default:
      return state
  }
}
