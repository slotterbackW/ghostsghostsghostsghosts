import React, { useState } from 'react'
import { render } from 'react-dom'

import SnakeGame from './components/SnakeGame/index.js'

const App = () => {
  const [score, setScore] = useState(1)

  const incrementScore = () => setScore(score + 1)

  return (
    <div>
      <h1>EVENT NAME</h1>
      <p>Some description</p>
      <h2>Score: {score}</h2>
      <SnakeGame handleScore={incrementScore} />
    </div>
  )
}

render(
    <App />,
    document.getElementById('root')
)
