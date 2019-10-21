import React from 'react'
import { render } from 'react-dom'

import SnakeGame from './components/SnakeGame/index.js'

const App = () => (
  <div>
    <h1>EVENT NAME</h1>
    <p>Some description</p>
    <SnakeGame />
  </div>

)

render(
    <App />,
    document.getElementById('root')
)
