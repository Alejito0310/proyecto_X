import React from 'react'
import './Btn1.css'

function Btn1({children, variant = "light", onClick=()=>{}}) {
  return (
    <button onClick={onClick} className={`btn1 btn1-${variant}`}>
      {children}
    </button>
  )
}

export function Text1({img, text1 ,imgClass}) {
  return (
    <div className='text1'>
      {img && (<img src={img} alt="icon" className={imgClass} />)}
      <span>{text1}</span>
    </div>
  )
}


export default Btn1
