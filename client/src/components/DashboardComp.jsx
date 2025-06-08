import React, { useEffect, useState } from 'react'
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import {Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from 'flowbite-react'
import {Link} from 'react-router-dom'


const DashboardComp = () => {
    const [users, setUsers] = useState([]);
    const [comments,setComments] = useState([]);
    const [posts,setPosts] = useState([]);
    const [totalUsers,setTotalusers] = useState(0);
    const [totalPosts,setTotalPosts] = useState(0);
    const [totalComments,setTotalComments] = useState(0);
    const [lastMonthUsers,setLastMonthUsers] = useState(0);
    const [lastMonthPosts,setLastMonthPosts] = useState(0);
    const [lastMonthComments,setLastMonthComments] = useState(0);

    const {currentUser} = useSelector((state)=> state.user);
  const   {theme}  = useSelector(state => state.theme);
    useEffect(()=>{
          const fetchUsers = async ()=>{
             try {
                 const res = await fetch('/api/user/getusers?limit=5');
              const data = await res.json();
              if (res.ok) {
                setUsers(data.users)
                setTotalusers(data.totalUsers)
                setLastMonthUsers(data.lastMonthUsers)
              }
             } catch (error) {
                console.log(error.message)
             }
          }
          const fetchPosts = async ()=>{
                try {
                 const res = await fetch('/api/post/getposts?limit=5');
              const data = await res.json();
              if (res.ok) {
                setPosts(data.posts)
                setTotalPosts(data.totalPosts)
                setLastMonthPosts(data.lastMonthPosts)
              }
             } catch (error) {
                console.log(error.message)
             }
          }
          const fetchComments = async ()=>{
                                    try {
                 const res = await fetch('/api/comment/getcomments?limit=5');
              const data = await res.json();
              if (res.ok) {
                setComments(data.comments)
                setTotalComments(data.totalComments)
                setLastMonthComments(data.lastMonthComments)
              }
             } catch (error) {
                console.log(error.message)
             }
          }
          if (currentUser.isSuperAdmin) {
            fetchUsers()
            fetchPosts()
            fetchComments()
          }
    },[currentUser]);

  return (
    <div className='p-3 md:mx-auto'>
<div className="flex-wrap flex gap-4">

               <div className={`flex  flex-col p-3 ${theme === 'dark' ? 'bg-slate-800' : ''} gap-4 md:w-72 w-full rounded-md shadow-md`} >
           <div className="flex justify-between">
                  <div className="">
                      <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
                      <p className='text-2xl'>{totalUsers}</p>
                  </div>
                      <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg'/>
                  </div>
                  <div className='flex gap-2 text-sm'>
                       <span className='text-green-500 flex items-center'>
                        <HiArrowNarrowUp/>
                        {lastMonthUsers}
                       </span>
                       <div className="text-gray-500">Last Month</div>
           </div>
        </div>
        <div className={`flex  flex-col p-3 ${theme === 'dark' ? 'bg-slate-800' : ''} gap-4 md:w-72 w-full rounded-md shadow-md`} >
           <div className="flex justify-between">
                  <div className="">
                      <h3 className='text-gray-500 text-md uppercase'>Total Comments</h3>
                      <p className='text-2xl'>{totalComments}</p>
                  </div>
                      <HiAnnotation className='bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg'/>
                  </div>
                  <div className='flex gap-2 text-sm'>
                       <span className='text-green-500 flex items-center'>
                        <HiArrowNarrowUp/>
                        {lastMonthComments}
                       </span>
                       <div className="text-gray-500">Last Month</div>
           </div>
        </div>
        <div className={`flex  flex-col p-3 ${theme === 'dark' ? 'bg-slate-800' : ''} gap-4 md:w-72 w-full rounded-md shadow-md`} >
           <div className="flex justify-between">
                  <div className="">
                      <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
                      <p className='text-2xl'>{totalPosts}</p>
                  </div>
                      <HiDocumentText className='bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg'/>
                  </div>
                  <div className='flex gap-2 text-sm'>
                       <span className='text-green-500 flex items-center'>
                        <HiArrowNarrowUp/>
                        {lastMonthPosts}
                       </span>
                       <div className="text-gray-500">Last Month</div>
           </div>
        </div>

</div>
          {/* <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
             <div className={`flex  flex-col w-full md:w-auto shadow-md p-2 rounded-md ${theme === 'dark' ? 'bg-gray-800' : ''}`}>
                <div className="flex justify-between p-3 text-sm font-semibold">
                  <h1 className='text-center p-2'>Recent users</h1>
                  <Button className='bg-gradient-to-br from-purple-500 to-pink-500' outline>
                     <Link to={'/dashboard?tab=users'}>
                      See all
                     </Link>
                  </Button>
                </div>
                <Table hoverable>
                   <TableHead>
                     <TableHeadCell>User image</TableHeadCell>
                     <TableHeadCell>Username</TableHeadCell>
                   </TableHead>
                   {
                     users && users.map((user)=>(
                        <TableBody className='divide-y' key={user._id}>
                            <TableRow className={`bg-white ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : ''}`}>
                               <TableCell>
                                 <img src={user.profilePicture} alt="user" className='w-10 h-10 rounded-full bg-gray-500' />
                               </TableCell>
                               <TableCell>{user.username}</TableCell>
                            </TableRow>
                        </TableBody>
                     ))
                   }
                </Table>
             </div>
             <div className={`flex  flex-col w-full md:w-auto shadow-md p-2 rounded-md ${theme === 'dark' ? 'bg-gray-800' : ''}`}>
                <div className="flex justify-between p-3 text-sm font-semibold">
                  <h1 className='text-center p-2'>Recent users</h1>
                  <Button className='bg-gradient-to-br from-purple-500 to-pink-500' outline>
                     <Link to={'/dashboard?tab=users'}>
                      See all
                     </Link>
                  </Button>
                </div>
                <Table hoverable>
                   <TableHead>
                     <TableHeadCell>User image</TableHeadCell>
                     <TableHeadCell>Username</TableHeadCell>
                   </TableHead>
                   {
                     users && users.map((user)=>(
                        <TableBody className='divide-y' key={user._id}>
                            <TableRow className={`bg-white ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : ''}`}>
                               <TableCell>
                                 <img src={user.profilePicture} alt="user" className='w-10 h-10 rounded-full bg-gray-500' />
                               </TableCell>
                               <TableCell>{user.username}</TableCell>
                            </TableRow>
                        </TableBody>
                     ))
                   }
                </Table>
             </div>
             <div className={`flex  flex-col w-full md:w-auto shadow-md p-2 rounded-md ${theme === 'dark' ? 'bg-gray-800' : ''}`}>
                <div className="flex justify-between p-3 text-sm font-semibold">
                  <h1 className='text-center p-2'>Recent users</h1>
                  <Button className='bg-gradient-to-br from-purple-500 to-pink-500' outline>
                     <Link to={'/dashboard?tab=users'}>
                      See all
                     </Link>
                  </Button>
                </div>
                <Table hoverable>
                   <TableHead>
                     <TableHeadCell>User image</TableHeadCell>
                     <TableHeadCell>Username</TableHeadCell>
                   </TableHead>
                   {
                     users && users.map((user)=>(
                        <TableBody className='divide-y' key={user._id}>
                            <TableRow className={`bg-white ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : ''}`}>
                               <TableCell>
                                 <img src={user.profilePicture} alt="user" className='w-10 h-10 rounded-full bg-gray-500' />
                               </TableCell>
                               <TableCell>{user.username}</TableCell>
                            </TableRow>
                        </TableBody>
                     ))
                   }
                </Table>
             </div>
          </div> */}

          <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
  <div className={`flex flex-col w-full md:w-auto shadow-md p-2 rounded-md ${theme === 'dark' ? 'bg-gray-800' : ''}`}>
    <div className="flex justify-between p-3 text-sm font-semibold">
      <h1 className="text-center p-2">Recent users</h1>
      <button className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-medium px-4 py-2 rounded-md">
        <Link to={'/dashboard?tab=users'}>See all</Link>
      </button>
    </div>
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">User image</th>
          <th scope="col" className="px-6 py-3">Username</th>
        </tr>
      </thead>
      {users &&
        users.map((user) => (
          <tbody className="divide-y" key={user._id}>
            <tr className={`bg-white ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : ''}`}>
              <td className="px-6 py-4">
                <img src={user.profilePicture} alt="user" className="w-10 h-10 rounded-full bg-gray-500" />
              </td>
              <td className="px-6 py-4">{user.username}</td>
            </tr>
          </tbody>
        ))}
    </table>
  </div>

  {/* Copy-pasted 2 more times below with same replacements */}


   <div className={`flex flex-col w-full md:w-auto shadow-md p-2 rounded-md ${theme === 'dark' ? 'bg-gray-800' : ''}`}>
    <div className="flex justify-between p-3 text-sm font-semibold">
      <h1 className="text-center p-2">Recent comments</h1>
      <button className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-medium px-4 py-2 rounded-md">
        <Link to={'/dashboard?tab=comments'}>See all</Link>
      </button>
    </div>
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">comment content</th>
          <th scope="col" className="px-6 py-3">Likes</th>
        </tr>
      </thead>
      {comments &&
        comments.map((comment) => (
          <tbody className="divide-y" key={comment._id}>
            <tr className={`bg-white ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : ''}`}>
              <td className="px-6 py-4 w-96">
                <p className='line-clamp-2'>{comment.content}</p>
              </td>
              <td className="px-6 py-4">{comment.numberOfLikes}</td>
            </tr>
          </tbody>
        ))}
    </table>
  </div>

  <div className={`flex flex-col w-full md:w-auto shadow-md p-2 rounded-md ${theme === 'dark' ? 'bg-gray-800' : ''}`}>
    <div className="flex justify-between p-3 text-sm font-semibold">
      <h1 className="text-center p-2">Recent posts</h1>
      <button className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-medium px-4 py-2 rounded-md">
        <Link to={'/dashboard?tab=posts'}>See all</Link>
      </button>
    </div>
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">Post image</th>
          <th scope="col" className="px-6 py-3">Post Title</th>
          <th scope="col" className="px-6 py-3">Category</th>
        </tr>
      </thead>
      {posts &&
        posts.map((post) => (
          <tbody className="divide-y" key={post._id}>
            <tr className={`bg-white ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : ''}`}>
              <td className="px-6 py-4">
                <img src={post.image} alt="user" className="w-14 h-10 rounded-md bg-gray-500" />
              </td>
              <td className="px-6 py-4 w-96">{post.title}</td>
              <td className="px-6 py-4 w-5">{post.category}</td>
            </tr>
          </tbody>
        ))}
    </table>
  </div>

 
</div>




    </div>
  )
}

export default DashboardComp