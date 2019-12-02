import React, { Component } from 'react'
import './App.css'

const WIN_COMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

class App extends Component {
  state = {
    board: ['', '', '', '', '', '', '', '', ''],
    turn: 0
  }

  resetGame = () => {
    this.setState({
      board: ['', '', '', '', '', '', '', '', ''],
      turn: 0
    })
  }

  handleClick = e => {
    const { board, turn } = this.state
    const newBoard = [...board]
    newBoard[e.target.id] = turn % 2 ? 'O' : 'X'

    this.setState({
      board: newBoard,
      turn: turn + 1
    })
  }

  checkWin = () => {
    const { board } = this.state
    for (let i = 0; i < WIN_COMBO.length; i++) {
      const joinedStr = WIN_COMBO[i].map(i => board[i]).join('')
      if (joinedStr === 'XXX' || joinedStr === 'OOO') {
        return true
      }
    }
    return false
  }

  render() {
    const { board, turn } = this.state
    const hasWinner = this.checkWin()
    return (
      <>
        <h4 id="title">
          {hasWinner
            ? 'Game over!'
            : turn === 9
            ? 'Draw!'
            : `React Tic Tac Toe (Turn ${turn})`}
        </h4>
        {(hasWinner || turn === 9) && (
          <button
            className="btn btn-default border"
            id="reset-btn"
            onClick={this.resetGame}
          >
            Reset
          </button>
        )}
        <div id="board">
          {board.map((box, index) => (
            <div
              style={{
                pointerEvents: box || hasWinner ? 'none' : 'auto',
                background: box && '#8e8080'
              }}
              key={index}
              onClick={this.handleClick}
              className="box"
              id={index}
            >
              {box}
            </div>
          ))}
        </div>
      </>
    )
  }
}

export default App
