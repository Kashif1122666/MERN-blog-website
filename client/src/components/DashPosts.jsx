import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (currentUser?.isAdmin) {
      const fetchPosts = async () => {
        try {
          const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
          const data = await res.json();
          if (res.ok) {
            setUserPosts(data.posts);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchPosts();
    }
  }, [currentUser]);

  const isDark = theme === 'dark';

  return (
    <div className="w-full px-4 py-6">
      {currentUser?.isAdmin && userPosts.length >= 0 ? (
        <div className="w-full overflow-x-auto">
          <table
            className={`w-full min-w-[800px] text-sm text-left border rounded-lg ${
              isDark ? 'text-gray-300 bg-gray-900' : 'text-gray-800 bg-white'
            }`}
          >
            <thead className={`${isDark ? 'bg-gray-800' : 'bg-gray-100'} text-xs uppercase`}>
              <tr>
                <th className="px-6 py-3">Date Updated</th>
                <th className="px-6 py-3">Post Image</th>
                <th className="px-6 py-3">Post Title</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Delete</th>
                <th className="px-6 py-3">Edit</th>
              </tr>
            </thead>
            <tbody>
              {userPosts.map((post) => (
                <tr
                  key={post._id}
                  className={`border-b transition-colors duration-200 ${
                    isDark
                      ? 'border-gray-700 hover:bg-gray-800'
                      : 'border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-12 object-cover rounded-md bg-gray-300"
                      />
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    <Link
                      to={`/post/${post.slug}`}
                      className={isDark ? 'text-white' : 'text-gray-900'}
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{post.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-red-600 hover:underline cursor-pointer">Delete</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/update-post/${post._id}`}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          No posts yet!
        </p>
      )}
    </div>
  );
};

export default DashPosts;
