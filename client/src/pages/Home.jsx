import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import PostCard  from '../components/PostCard.jsx'
 
function Home() {
  const   {theme}  = useSelector(state => state.theme);
  const [posts , setPosts] = useState([]);

  useEffect(()=>{
     const fetchPosts = async () =>{
       const res = await fetch('/api/post/getPosts');
       const data = await res.json();
       setPosts(data.posts)
     }
     fetchPosts()
  },[]);
  return (
    <div >
        <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
          <h1 className='text-3xl font-bold lg:text-6xl'>Welcome To Skills Exchange </h1>
          <p className='text-gray-500 text-xs sm:te</p>xt-sm'>Discover a community where skills meet opportunity. Our platform connects individuals eager to learn with those ready to teach — whether it's coding, design, photography, or language learning. Share your talents, exchange knowledge, and grow together in a supportive, collaborative environment. Empower yourself and others through skill-sharing today!</p>
        <Link to={'/search'} className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
          View all Posts
        </Link>
        </div>
        <div className="max-w-7xl mx-auto p-3 flex flex-col gap-8 py-7">
            {
              posts && posts.length > 0 && (
                <div className="flex flex-col gap-6">
                   <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
                <div className="flex flex-wrap justify-center gap-6">
                {posts.map((post) => (
                  <div
                   key={post._id}
                     className="w-full sm:w-[48%] lg:w-[32%] flex justify-center"
                     >
                      <PostCard post={post} />
                      </div>
                       ))}
                     </div>
                      <Link to={'/search'} className='text-lg text-teal-500 hover:underline text-center'> View all Posts</Link>
                </div>
              ) 
            }
        </div>
    </div>
  )
}

export default Home