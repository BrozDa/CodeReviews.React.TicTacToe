import React, {useState} from 'react'

function Square({value, onSquareClick}) {

  const [text, setText] = useState(value)

  

  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  )
}

export default Square