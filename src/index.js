import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  taskCompleted,
  titleChanged,
  taskDeleted
} from './store/task'
import configureStore from './store/store'

//initializeStore
const store = configureStore()

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
    store.dispatch(taskCompleted(taskId))
  }

  const changeTitle = (taskId) => {
    store.dispatch(titleChanged(taskId))
  }

  const deleteTask = (taskId) => {
    store.dispatch(taskDeleted(taskId))
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

            <button onClick={() => deleteTask(el.id)}>
              Delete task
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
