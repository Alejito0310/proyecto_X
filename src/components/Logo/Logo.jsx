import React from 'react'
import '../../App.css'

function Logo() {
  return (
    <picture className='logo'>
      <source 
        srcSet="../../../img/X-Dark.png" 
        media="(prefers-color-scheme: dark)" 
        style={{ width: '100%', height: '100%' }} 
      />
      <img 
        src="../../../img/X-Light.jpg" 
        alt="Twitter Logo" 
        style={{ width: '100%', height: '100%' }} 
      />
    </picture>
  );
}

export default Logo
