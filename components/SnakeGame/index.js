import React, { Component } from 'react'
import { render } from 'react-dom'
import { defineSwipe, Swipeable } from 'react-touch'

import './styles.css'

const WIDTH = 320
const HEIGHT = 320
const SNAKE_SIZE = WIDTH / 30
const FOOD_SIZE = SNAKE_SIZE / 2
const DIRECTIONS = {
  UP: [0, -SNAKE_SIZE],
  RIGHT: [SNAKE_SIZE, 0],
  DOWN: [0, SNAKE_SIZE],
  LEFT: [-SNAKE_SIZE, 0],
  NONE: [0, 0]
}

export default class SnakeGame extends Component {
  constructor(props) {
    super(props)

    this.canvasRef = React.createRef()

    this.state = {
      direction: DIRECTIONS.NONE,
      snake: [[WIDTH / 2, HEIGHT / 2 - 50]],
      food: [100 + FOOD_SIZE / 2, 100 + FOOD_SIZE / 2],
      isGameStarted: false,
      isGameOver: false,
      isMobile: null,
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.moveSnake = this.moveSnake.bind(this)
  }

  componentDidMount() {
    const isMobile = this.state.isMobile
    if (isMobile === null) {
      this.setState({isMobile: window.innerWidth <= 1024})
    }
    document.addEventListener("keydown", this.handleKeyDown)
    this.canvasRef.current.addEventListener("touchmove", this.preventTouch, {passive: false})
    this.drawCanvas()
  }

  componentDidUpdate() {
    this.drawCanvas()

    if (this.isGameOver()) {
      if (this.state.isGameOver) {
        return
      }
      this.setState({isGameOver: true})
      return
    }

    if (this.isFoodEaten()) {
      this.props.incrementScore()
      this.setState({food: this.generateFood(), snake: this.addSegment()})
      return
    }

    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => this.moveSnake(), 100)
  }

  componentWillUnmount() {
    this.canvasRef.current.removeEventListener("touchmove", this.preventTouch, {passive: false})
    document.removeEventListener("keydown", this.handleKeyDown)
    clearTimeout(this.timeout)
  }

  preventTouch(e) {
    e.preventDefault()
  }

  startGame() {
    const isGameStarted = this.state.isGameStarted
    if (isGameStarted) {
      return;
    }
    this.setState({isGameStarted: true})
  }

  moveUp() {
    this.startGame()
    const direction = this.state.direction
    if (direction !== DIRECTIONS.DOWN) {
      this.setState({direction: DIRECTIONS.UP})
    }
  }

  moveDown() {
    this.startGame()
    const direction = this.state.direction
    if (direction !== DIRECTIONS.UP) {
      this.setState({direction: DIRECTIONS.DOWN})
    }
  }

  moveRight() {
    this.startGame()
    const direction = this.state.direction
    if (direction !== DIRECTIONS.LEFT) {
      this.setState({direction: DIRECTIONS.RIGHT})
    }
  }

  moveLeft() {
    this.startGame()
    const direction = this.state.direction
    if (direction !== DIRECTIONS.RIGHT) {
      this.setState({direction: DIRECTIONS.LEFT})
    }
  }

  handleKeyDown(e) {
    this.setState({isGameStarted: true})
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        this.moveUp()
        break
      case 'ArrowDown':
        e.preventDefault()
        this.moveDown()
        break
      case 'ArrowLeft':
        e.preventDefault()
        this.moveLeft()
        break
      case 'ArrowRight':
        e.preventDefault()
        this.moveRight()
        break
      case 'r':
        this.restart()
        break
      default:
        return
    }
  }

  isOverlapping(segment1, segment2, size1, size2) {
    const l1 = {
      x: segment1[0],
      y: segment1[1]
    }
    const r1 = {
      x: segment1[0] + size1,
      y: segment1[1] + size1
    }
    const l2 = {
      x: segment2[0],
      y: segment2[1]
    }
    const r2 = {
      x: segment2[0] + size2,
      y: segment2[1] + size2
    }

    if (l1.x >= r2.x || l2.x >= r1.x) return false
    if (l1.y >= r2.y || l2.y >= r1.y) return false

    return true
  }

  restart() {
    this.props.setScore(1)
    this.setState({
      direction: DIRECTIONS.NONE,
      snake: [[WIDTH / 2, HEIGHT / 2 - 50]],
      food: [100 + FOOD_SIZE / 2, 100 + FOOD_SIZE / 2],
      isGameStarted: false,
      isGameOver: false
    })
  }

  isSnakeOutOfBounds() {
    const head = this.state.snake[0]
    return head[0] < 0 || head[0] > WIDTH || head[1] < 0 || head[1] > HEIGHT
  }

  isGameOver() {
    if (this.isSnakeOutOfBounds()) {
      return true
    }

    const snake = this.state.snake
    if (snake.length <= 2) {
      return
    }
    const head = snake[0]
    const body = snake.slice(1, snake.length)

    return body.some(segment => this.isOverlapping(head, segment, SNAKE_SIZE, SNAKE_SIZE))
  }

  isFoodEaten() {
    const { food, snake } = this.state
    const head = snake[0]
    return this.isOverlapping(head, food, SNAKE_SIZE, FOOD_SIZE)
  }

  generateFood() {
    const x = Math.trunc(Math.random() * (WIDTH - FOOD_SIZE * 2) + FOOD_SIZE)
    const y = Math.trunc(Math.random() * (HEIGHT - FOOD_SIZE * 2) + FOOD_SIZE)
    return [x, y]
  }

  addSegment() {
    const snake = this.state.snake
    const newSegment = snake[snake.length - 1]
    snake.push(newSegment)
    return snake
  }

  moveSnake() {
    const { snake, direction } = this.state
    let newSnake = []
    let prevSegment
    snake.forEach(segment => {
      if (!prevSegment) {
        prevSegment = segment
        let newSegment = [segment[0] + direction[0], segment[1] + direction[1]]
        newSnake.push(newSegment)
        return
      }

      newSnake.push(prevSegment)
      prevSegment = segment
    })
    this.setState({snake: newSnake})
  }

  drawCanvas() {
    const canvas = this.canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    this.drawSnake(ctx)
    this.drawFood(ctx)
  }

  drawSnake(ctx) {
    this.state.snake.forEach(segment => {
      this.drawRect(segment[0], segment[1], SNAKE_SIZE, "black", ctx)
    })
  }

  drawFood(ctx) {
    const food = this.state.food
    this.drawRect(food[0], food[1], FOOD_SIZE, "#ff7518", ctx)
  }

  drawRect(x, y, size, color, ctx) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
  }

  render() {
    const { isGameStarted, isGameOver, isMobile } = this.state
    const divStyle = {
      height: `${HEIGHT}px`,
      width: `${WIDTH}px`
    }
    const swipeConfig = defineSwipe({swipeDistance: 50});

    return (
      <>
        {!isGameStarted &&
          <Swipeable config={swipeConfig} onSwipeLeft={() => this.moveLeft()} onSwipeRight={() => this.moveRight()} onSwipeUp={() => this.moveUp()} onSwipeDown={() => this.moveDown()}>
            <div className="fake-canvas" style={divStyle}>
                <h3 className="help-text">{isMobile ? 'Swipe in any direction to start the game' : 'Press any arrow key to start the game'}</h3>
            </div>
          </Swipeable>
        }
        {isGameOver &&
          <div className="fake-canvas" style={divStyle}>
            <h3>GAME OVER</h3>
            <h4>{isMobile ? '' : 'Press \'r\' to restart'}</h4>
          </div>
        }
        <Swipeable config={swipeConfig} onSwipeLeft={() => this.moveLeft()} onSwipeRight={() => this.moveRight()} onSwipeUp={() => this.moveUp()} onSwipeDown={() => this.moveDown()}>
          <canvas className={'snake-canvas'} ref={this.canvasRef} width={WIDTH} height={HEIGHT}></canvas>
        </Swipeable>
        {isMobile &&
          <div className="bottom-buttons-container">
            <button onClick={() => this.restart()} className="restart-button">Restart</button>
          </div>
        }
      </>
    )
  }
}
