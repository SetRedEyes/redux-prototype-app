import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import * as actions from './store/actions'
import { initiateStore } from './store/store'

//initializeStore
const store = initiateStore()

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
    store.dispatch(actions.taskCompleted(taskId))
  }

  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChanged(taskId))
  }

  const deleteTask = (taskId) => {
    store.dispatch(actions.taskDeleted(taskId))
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
