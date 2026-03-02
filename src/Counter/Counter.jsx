import React, { useEffect, useState } from 'react'
import useCounter from '../Counter/useCounter'
import './Counter.css'

function Counter({table, column, value, children}) {

    const {count, setCount} = useCounter(table, column, value)

  return (
    <div className="counter-container">
      {children}
      <span className="counter-number">
        {count > 0 ? count : ""}
      </span>
    </div>
  )
}
export default Counter
