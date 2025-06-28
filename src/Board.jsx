import {useEffect, useState} from 'react'
import Square from './Square'

function Board({xIsNext,squares,onPlay, bgColors, setBgColors,setLatestMove}) {

  const [status, setStatus] = useState('Next player: ' + (xIsNext ? 'X' : 'O'))
  function handleClick(i) {
  if (squares[i] || calculateWinner(squares)) {
    return;
  }

  const nextSquares = squares.slice();
  nextSquares[i] = xIsNext ? "X" : "O";
  let latestMove = {
    xCoord:i%3,
    yCoord: Math.floor(i/3)
  }
  onPlay(nextSquares,latestMove);
}
  

  

  function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningLine: [a, b, c] };
    }
  }
  return null;
  }

  function setWinnerColors(winningLine){

    const newColors = Array(9).fill("#fff");
    for(let sq of winningLine){
      newColors[sq] = "#154f13";
    }
    setBgColors(newColors);
  }

  useEffect(() => {

    const winnerResult = calculateWinner(squares);

    if (winnerResult ) {
      setStatus('Winner: ' + winnerResult.winner)
      setWinnerColors(winnerResult.winningLine);
    } 
    else if(!squares.includes(null)){
      setStatus("Draw")
    }
    else {
      setStatus('Next player: ' + (xIsNext ? 'X' : 'O'));
    }
  },[squares, xIsNext]);
  

  function generateRow(startNumber){
    const rows = [];
    for(let i = startNumber; i < startNumber+3; i++){
      rows.push(
        <Square 
          key = {i}
          value={squares[i]} 
          onSquareClick = {() => handleClick(i)}
          bgCol = {bgColors[i]}
          />
      )
    }
    return <div key = {startNumber} className="board-row">{rows}</div>
  }

  function generateBoard(){
    const board = [];
    for(let i = 0; i < 3; i++){
      board.push(generateRow(i*3))
    }
    return <div className="board">{board}</div>
  }


  return (
    <>
      <div className="status">{status}</div>
      {generateBoard()}
    </>
    
  )
}

export default Board