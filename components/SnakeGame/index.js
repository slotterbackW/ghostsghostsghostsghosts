import React, { Component } from 'react'
import { render } from 'react-dom'

const WIDTH = 500
const HEIGHT = 500
const SNAKE_SIZE = WIDTH / 30
const FOOD_SIZE = SNAKE_SIZE / 2

const CANVAS_ID = "canvas-snake"

export default class SnakeGame extends Component {
  constructor(props) {
    super(props)

    this.canvasRef = React.createRef()

    this.state = {
      direction: [0, SNAKE_SIZE],
      snake: [[WIDTH / 2, HEIGHT / 2]],
      food: [100 + FOOD_SIZE / 2, 100 + FOOD_SIZE / 2],
      isGameOver: false,
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.moveSnake = this.moveSnake.bind(this)
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown)
    this.drawCanvas()
  }

  componentDidUpdate() {
    this.drawCanvas()
    console.log(this.state.snake)

    this.checkGameOver()
    if (this.state.isGameOver) {
      shouldMove = false
    }

    let shouldMove = true;
    if (this.isFoodEaten()) {
      this.setState({food: this.generateFood(), snake: this.addSegment()})
      shouldMove = false
    }

    clearTimeout(this.timeout)
    if (shouldMove) {
      this.timeout = setTimeout(() => this.moveSnake(), 200)
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown)
    clearTimeout(this.timeout)
  }

  handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowUp':
        this.setState({direction: [0, -SNAKE_SIZE]})
        break
      case 'ArrowDown':
        this.setState({direction: [0, SNAKE_SIZE]})
        break
      case 'ArrowLeft':
        this.setState({direction: [-SNAKE_SIZE, 0]})
        break
      case 'ArrowRight':
        this.setState({direction: [SNAKE_SIZE, 0]})
        break
      default:
        return
    }
  }

  checkGameOver() {
    let eqObj = {}
    let isGameOver = false
    for (const segment of this.state.snake) {
      let key = `${segment[0]}${segment[1]}`
      if (eqObj.hasOwnProperty(key)) {
        isGameOver = true
      } else {
        eqObj[key] = true
      }
    }

    if (isGameOver === true) {
      console.log("Game over")
      //this.setState({isGameOver})
    }
  }

  isFoodEaten() {
    const { food, snake } = this.state;
    console.log(food, snake)
    return snake.some(segment => {
      const xdif = food[0] - segment[0]
      const ydif = food[1] - segment[1]
      return xdif <= SNAKE_SIZE &&
              xdif >= 0 &&
              ydif <= SNAKE_SIZE &&
              ydif >= 0
    })
  }

  generateFood() {
    const x = Math.trunc(Math.random() * WIDTH + FOOD_SIZE / 2)
    const y = Math.trunc(Math.random() * HEIGHT + FOOD_SIZE / 2)
    return [x, y]
  }

  addSegment() {
    const snake = this.state.snake
    const newSegment = snake[snake.length - 1]
    return snake.concat(newSegment)
  }

  moveSnake() {
    const { snake, direction } = this.state
    let newSnake = [];
    let prevSegment;
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
    this.drawRect(food[0], food[1], FOOD_SIZE, "red", ctx)
  }

  drawRect(x, y, size, color, ctx) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
  }

  render() {
      return (
        <>
          <h1>SNAKEE</h1>
          <canvas id={CANVAS_ID} ref={this.canvasRef} width={WIDTH} height={HEIGHT}></canvas>
        </>
      )
  }
}
