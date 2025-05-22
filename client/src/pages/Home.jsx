import React from 'react'
import { useSelector } from 'react-redux';

function Home() {
  const   {theme}  = useSelector(state => state.theme);
  return (
    <div className={`${theme === 'light' ? 'bg-white text-gray-700' : 'text-gray-200 bg-[rgb(16,23,42)]'}`}>Home</div>
  )
}

export default Home