import React from 'react'

function layout({ children }) {
  return (
    <div className='w-screen h-screen'>
        {children}
    </div>
  )
}

export default layout