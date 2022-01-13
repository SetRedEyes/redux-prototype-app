import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [state, setState] = useState({})
  // setState((prevState) => ({ ...prevState, id: '123' }))
  console.log(state)
  return <h1>App</h1>
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
