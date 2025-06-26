import React, { useEffect, useState } from 'react'

import Board from './Board'

function Game() {

  const [xIsNext, setXIsNext] = useState(true)
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove ] = useState(0);
  const [sortAsc, setSortAsc] = useState(true)
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares)
  {
    
    const nextHistory =  [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }
  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {

    if(!sortAsc){
      move = history.length-1 - move;
    }

    const isCurrentMove = move === currentMove;
    const description = (move === 0) 
                      ? 'Go to game start' 
                      : 'Go to move #' + move;

    return (
      <li key={move}>
         {isCurrentMove
          ? <span >{`You are on move: ${move}`}</span> 
          : <button onClick={() => jumpTo(move)}>{description}</button>
        }
      </li>
    )

  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <button onClick={() => setSortAsc(!sortAsc)}>Rearrange History</button>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

export default Game