import React, {useState} from 'react'

function Square({value, onSquareClick, bgCol}) {

  return (
    <button className='square' onClick={onSquareClick} style={{backgroundColor:bgCol}}>
      {value}
    </button>
  )
}

export default Square