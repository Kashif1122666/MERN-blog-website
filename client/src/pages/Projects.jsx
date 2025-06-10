import React from 'react'
import { useSelector } from 'react-redux';

function Projects() {
  const   {theme}  = useSelector(state => state.theme);
  return (
    <div className={`${theme === 'light' ? 'bg-white text-gray-700' : 'text-gray-200 bg-[rgb(16,23,42)]'}`}>
      <h1 className='text-3xl font-semibold text-center my-7'>Projects</h1>
    </div>
  )
}

export default Projects