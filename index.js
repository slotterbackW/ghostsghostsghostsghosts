import React, { useState } from 'react'
import { render } from 'react-dom'

import './index.css'
import FindDifference from './images/difference.png'
import Ella1 from './images/ella1.JPG'
import Ella2 from './images/ella2.JPG'
import SnakeGame from './components/SnakeGame/index.js'

const App = () => {
  const [score, setScore] = useState(1)

  const incrementScore = () => setScore(score + 1)
  const handleScore = s => setScore(s)

  return (
    <div className="page">
      <h1 className="title">GHOSTS GHOSTS GHOSTS GHOSTS</h1>
      <p className="description">Halloween is BACK from the DEAD for one last SPOOKY spectacular. So keep those turkeys in the closet for one more week and engage in some sCareGiving.
      When's this party? Whose this party? What's this party? When's this party? Where's this party? There's only one way to find out – enter the snakehole!</p>
      <p>* Sponsored by Sprite Cranberry, Phish, Patrick Swayze, and Ghost (disambiguation).</p>
      <div className="snake-container">
        <h2>Score: {score}</h2>
        <SnakeGame setScore={handleScore} incrementScore={incrementScore} />
      </div>
      <div className="hint-container">
        {score < 10 &&
          <p className="hint">You're still in the snakehole. Get 10 points and we'll talk.</p>
        }
        {score >= 10 && score < 20 &&
          <p className="hint">Blinky: I won’t leave you on red. This ones the low hanging fruit though. Float through 886 26th Avenue for a chilling good time.</p>
        }
        {score >= 20 && score < 30 &&
          <p className="hint"> Inky: Ghosts dont put much by punctuality - which is lucky for some of you. Get here by 9 for the mango flavored vodka.</p>
        }
        {score >= 30 && score < 40 &&
          <p className="hint">Pinky: Depending on how good you are at snake this may have taken a lifetime. Now at death's door, I will tell you the theme: Famous clones and lesser known twins.</p>
        }
        {score >= 40 && score < 50 &&
          <p className="hint">Ghost Witch of Netor: the theme is actually ghosts - come on. If you come before 8:30 though we will give you an old fashioned on the house.</p>
        }
        {score >= 50 &&
          <p className="hint">Hoewel hij er nog niets over los wilde laten, liet hij ons wel weten dat we op de E3 een grote aankondiging mogen verwachten. Hoewel hij zelf graag nog een zingende Pac-Man zou willen zien, heeft Namco daar nog geen oren naar. Ideëen waar hij zelf niets mee op heeft, zijn een first-person Pac-Man, of een Pac-Man-game met motion control. Iwatani's visie voor de toekomst, of wat hij graag zou zien: games zonder of voorbij de normale display (think Rubik's Cube).</p>
        }
      </div>
      <h1>Photo Gallery</h1>
      <p className="description">Here's some spoooky inspiration</p>
      <div className="gallery">
        <img className="gallery-image" style={{transform: "rotate(90deg)"}} src={Ella1} alt="A group of friends in costume"/>
        <img className="gallery-image" src={Ella2} alt="A group of friends in costume"/>
      </div>
      <p>(Email Will your photos to add to the gallery)</p>
      <h1>Find the difference</h1>
      <p className="description">Because why not</p>
      <img src={FindDifference} alt="Find the difference image" className="find-difference"/>
    </div>
  )
}

render(
    <App />,
    document.getElementById('root')
)
