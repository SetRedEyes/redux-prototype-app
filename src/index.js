import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  titleChanged,
  taskDeleted,
  completeTask,
  getTasks
} from './store/task'
import initializeStore from './store/store'
import {
  Provider,
  useSelector,
  useDispatch
} from 'react-redux'

//initializeStore
const store = initializeStore()

const App = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTasks())
  }, [])

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId))
  }

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId))
  }
  return (
    <>
      <h1>App</h1>

      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button
              onClick={() => dispatch(completeTask(el.id))}
            >
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
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
