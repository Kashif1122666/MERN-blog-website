import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard.jsx';
import { motion } from 'framer-motion';
import homePic from '../images/homePic.png'; 

function Home() {
  const { theme } = useSelector(state => state.theme);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {/* Header Section */}
      <motion.div
        className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold lg:text-6xl text-center">
          Welcome To Skills Exchange
        </h1>

        {/* Responsive Image */}
        <img
          src={homePic} // Replace this with your actual image path
          alt="Skills Exchange Banner"
          className="w-full max-w-4xl mx-auto h-auto object-cover rounded-xl shadow-md"
        />

        <p className="text-gray-500 text-xs sm:text-sm text-center">
          Discover a community where skills meet opportunity. Our platform connects individuals eager to learn with those ready to teach — whether it's coding, design, photography, or language learning. Share your talents, exchange knowledge, and grow together in a supportive, collaborative environment. Empower yourself and others through skill-sharing today!
        </p>

        <Link
          to={'/search'}
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline text-center"
        >
          View all Posts
        </Link>
      </motion.div>

      {/* Posts Section */}
      <motion.div
        className="max-w-7xl mx-auto p-3 flex flex-col gap-8 py-7"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {posts && posts.length > 0 && (
          <motion.div
            className="flex flex-col gap-6"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {posts.map((post, index) => (
                <motion.div
                  key={post._id}
                  className="w-full sm:w-[48%] lg:w-[32%] flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </div>
            <Link
              to={'/search'}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all Posts
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Home;
