import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {FaCheck, FaTimes} from 'react-icons/fa';

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [showMore, setShowMore] = useState(true);
  const [comments, setComments] = useState([]);
  const [showModal , setShowModal] = useState(false);
  const [commentIdToDelete,setCommentIdToDelete] = useState('');

  useEffect(() => {
    
      const fetchComments = async () => {
        try {
          const res = await fetch(`/api/comment/getcomments`,{

          });
          const data = await res.json();
          if (res.ok) {
            setComments(data.comments);
            if (data.comments.length < 9) {
                setShowMore(false)
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      
      }
      fetchComments();
  }, [currentUser]);

  const isDark = theme === 'dark';

  const handleShowMore = async ()=> {
           const startIndex = comments.length;
           try {
              const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
              const data = await res.json();
              console.log(data)
              if (res.ok) {
                setComments((prev)=> [...prev,...data.comments])
                if (data.comments?.length < 9) {
                    setShowMore(false);
                }
              }
           } catch (error) {
              console.log(error.message)
           }
  }
   const handleDeleteComment = async () => {
                   setShowModal(false)
               try {
                  const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`,{
                    method:'DELETE',
                  });
                  const data = await res.json();
                  if (res.ok) {
                     setComments((prev)=> prev.filter((comment)=> comment._id !== commentIdToDelete));
                     setShowModal(false)
                  }else{
                    console.log(data.message)
                  }
               } catch (error) {
                  console.log(error.message)
               }
   }

  return (
    <div className="w-full px-4 py-6">
      {currentUser?.isSuperAdmin && comments.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <table
            className={`w-full min-w-[800px] text-sm text-left border rounded-lg ${
              isDark ? 'text-gray-300 bg-gray-900' : 'text-gray-800 bg-white'
            }`}
          >
            <thead className={`${isDark ? 'bg-gray-800' : 'bg-gray-100'} text-xs uppercase`}>
              <tr>
                <th className="px-6 py-3">Date Updated</th>
                <th className="px-6 py-3">Comment content</th>
                <th className="px-6 py-3">Number of likes</th>
                <th className="px-6 py-3">PostId</th>
                <th className="px-6 py-3">UserId</th>
                <th className="px-6 py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr
                  key={comment._id}
                  className={`border-b transition-colors duration-200 ${
                    isDark
                      ? 'border-gray-700 hover:bg-gray-800'
                      : 'border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    
                    {comment.content}
                    
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                  
                      {comment.numberOfLikes}
                 
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{comment.postId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{comment.userId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span onClick={() =>{
                          setShowModal(true)
                          setCommentIdToDelete(comment._id)
                    }} className="text-red-600 hover:underline cursor-pointer">Delete</span>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
            {
              showMore &&  <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>Show more</button>
            }
        </div>
      ) : (
        <p className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          No Comment yet wait!
        </p>
      )}
      <Modal show={showModal} onClose={()=> setShowModal(false)} popup size='md'>
                  <ModalHeader/>
                  <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto h-14 w-14 text-gray-500 dark:text-gray-400" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                           Are you sure you want to delete this Comment?
                                </h3>
                               <div className="flex justify-center gap-4">
        <Button  className='bg-red-600' onClick={handleDeleteComment}>
          Yes, I'm sure
        </Button>
        <Button color='gray' onClick={() => setShowModal(false)}>
          No, cancel
        </Button>
      </div>
      
                    </div>
                  </ModalBody>
               </Modal>
    </div>
  );
};

export default DashComments;
