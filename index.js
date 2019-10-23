import React, { useState } from 'react'
import { render } from 'react-dom'

import './index.css'
import SnakeGame from './components/SnakeGame/index.js'

const App = () => {
  const [score, setScore] = useState(1)

  const incrementScore = () => setScore(score + 1)
  const handleScore = s => setScore(s)

  return (
    <div className="page">
      <h1>GHOSTS GHOSTS GHOSTS GHOSTS</h1>
      <p>Some description</p>
      <div className="snake-container">
        <h2>Score: {score}</h2>
        <SnakeGame setScore={handleScore} incrementScore={incrementScore} />
      </div>
      <div className="hint-container">
        {score < 10 &&
          <p>You must score at least 10 points to find out the date</p>
        }
        {score >= 10 && score < 20 &&
          <p>The event will be held on [TBD]. Score 20 points to find out the time</p>
        }
        {score >= 20 && score < 30 &&
          <p>The event will start at [TBD]. Score 30 points to...</p>
        }
      </div>
      <h1>Photo Gallery</h1>
      <p>Here's some spoooky inspiration</p>
      <h1>Find the difference</h1>
      <p>...</p>
    </div>
  )
}

render(
    <App />,
    document.getElementById('root')
)
