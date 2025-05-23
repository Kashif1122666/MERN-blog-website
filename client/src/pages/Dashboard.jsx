import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';

function Dashboard() {
      const   {theme}  = useSelector(state => state.theme);
      const location = useLocation();
      const [tab , setTab] = useState();
      useEffect(()=>{
         const urlParams = new URLSearchParams(location.search);
         const tabFromUrl = urlParams.get('tab');
         if(tabFromUrl){
          setTab(tabFromUrl)
         }
      },[location.search]);
  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${theme === 'light' ? 'bg-white text-gray-700' : 'text-gray-200 bg-[rgb(16,23,42)]'}`}>
        <div className='md:w-56'>
       {/* sidebar */}
       <DashSidebar/>

        </div>
            {/* profile..*/}
           {tab === 'profile' && <DashProfile/>}
    </div>
    
  )
}

export default Dashboard