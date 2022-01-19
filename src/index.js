import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  titleChanged,
  taskDeleted,
  completeTask,
  loadTasks,
  getTasks,
  getTasksLoadingStatus,
  createTask
} from './store/task'
import initializeStore from './store/store'
import {
  Provider,
  useSelector,
  useDispatch
} from 'react-redux'
import { getError } from './store/errors'

//initializeStore
const store = initializeStore()

const App = () => {
  const state = useSelector(getTasks())
  const isLoading = useSelector(getTasksLoadingStatus())
  const error = useSelector(getError())

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTasks())
  }, [])

  const addNewTask = () => {
    dispatch(
      createTask({
        userId: 1,
        title: 'New Task',
        completed: false
      })
    )
  }

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId))
  }

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId))
  }
  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <h1>App</h1>

      <ul>
        <button onClick={addNewTask}>Add task</button>
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
