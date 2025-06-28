import React, { useEffect, useState } from 'react'

import Board from './Board'

function Game() {

  const [xIsNext, setXIsNext] = useState(true)
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove ] = useState(0);
  const [sortAsc, setSortAsc] = useState(true)
  const [bgColors, setBgColors] = useState(Array(9).fill("#fff"));
  const [moveHistory, setMoveHistory] = useState([]);

  const currentSquares = history[currentMove];

  function handlePlay(nextSquares, latestMove)
  {
    
    const nextHistory =  [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
    setMoveHistory([...moveHistory, latestMove]);
  }
  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
    setBgColors(Array(9).fill("#fff"));
  }
  const movesPlus = history.map((_, move) => {
  const displayMove = sortAsc ? move : history.length - 1 - move;
  const isCurrentMove = displayMove === currentMove;

  const moveInfo = moveHistory[move];
  const coords = moveInfo ? ` [${moveInfo.xCoord}/${moveInfo.yCoord}]` : "";

  const description = (move === 0) 
    ? 'Go to game start' 
    : `Go to move #${move}${coords}`;

  return (
    <li key={displayMove}>
      {isCurrentMove
        ? <span>{`You are on move: ${displayMove}`}</span> 
        : <button onClick={() => jumpTo(displayMove)}>{description}</button>
      }
    </li>
  );
});
  return (
    <div className="game">
      <div className="game-board">
        <Board 
          xIsNext={xIsNext} 
          squares={currentSquares} 
          onPlay={handlePlay}
          bgColors={bgColors}
          setBgColors={setBgColors}
        />
      </div>
      <div className="game-info">
        <button onClick={() => setSortAsc(!sortAsc)}>Rearrange History</button>
        <ol>{movesPlus}</ol>
      </div>
    </div>
  )
}

export default Game