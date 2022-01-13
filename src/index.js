import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

//Reducer
function taskReducer(state, action) {
  switch (action.type) {
    case 'task/completed':
      const newArray = [...state]
      const elementIndex = newArray.findIndex(
        (el) => el.id === action.payload.id
      )
      newArray[elementIndex].completed = true
      return newArray
    default:
      return state
  }
}

//createStore
function createStore(reducer, initialState) {
  let state = initialState

  function getState() {
    return state
  }

  function dispatch(action) {
    state = reducer(state, action)
  }

  return { getState, dispatch }
}

//initializeStore
const store = createStore(taskReducer, [
  { id: 1, description: 'Task1', completed: false },
  { id: 2, description: 'Task2', completed: false }
])

const App = () => {
  const state = store.getState()

  const completedTask = (taskId) => {
    store.dispatch({
      type: 'task/completed',
      payload: { id: taskId }
    })
    console.log(store.getState())
  }
  return (
    <>
      <h1>App</h1>

      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.description}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => completedTask(el.id)}>
              Complete
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
