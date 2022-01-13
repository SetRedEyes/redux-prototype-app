import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from './store/createStore'
import { taskReducer } from './store/taskReducer'
import * as actions from './store/actionTypes'
const initialState = [
  { id: 1, title: 'Task1', completed: false },
  { id: 2, title: 'Task2', completed: false }
]

//initializeStore
const store = createStore(taskReducer, initialState)

const App = () => {
  const [state, setState] = useState(store.getState())
  useEffect(
    () =>
      store.subscribe(() => {
        setState(store.getState())
      }),
    []
  )

  const completedTask = (taskId) => {
    store.dispatch({
      type: actions.taskUpdated,
      payload: { id: taskId, completed: true }
    })
  }

  const changeTitle = (taskId) => {
    store.dispatch({
      type: actions.taskUpdated,
      payload: {
        id: taskId,
        title: `New title for ${taskId}`
      }
    })
  }
  return (
    <>
      <h1>App</h1>

      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => completedTask(el.id)}>
              Complete
            </button>
            <button onClick={() => changeTitle(el.id)}>
              Change title
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
