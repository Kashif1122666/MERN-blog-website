import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {FaCheck, FaTimes} from 'react-icons/fa';

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [showMore, setShowMore] = useState(true);
  const [users, setUsers] = useState([]);
  const [showModal , setShowModal] = useState(false);
  const [userIdToDelete,setUserIdToDelete] = useState('');

  useEffect(() => {
    if (currentUser?.isAdmin) {
      const fetchUsers = async () => {
        try {
          const res = await fetch(`/api/user/getusers`);
          const data = await res.json();
          if (res.ok) {
            setUsers(data.users);
            if (data.users.length < 9) {
                setShowMore(false)
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchUsers();
    }
  }, [currentUser]);

  const isDark = theme === 'dark';

  const handleShowMore = async ()=> {
           const startIndex = users.length;
           try {
              const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
              const data = await res.json();
              console.log(data)
              if (res.ok) {
                setUsers((prev)=> [...prev,...data.users])
                if (data.users?.length < 9) {
                    setShowMore(false);
                }
              }
           } catch (error) {
              console.log(error.message)
           }
  }
   const handleDeleteUser = async () => {
               try {
                  const res = await fetch(`/api/user/delete/${userIdToDelete}`,{
                    method:'DELETE',
                  });
                  const data = await res.json();
                  if (res.ok) {
                     setUsers((prev)=> prev.filter((user)=> user._id !== userIdToDelete));
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
      {currentUser?.isAdmin && users.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <table
            className={`w-full min-w-[800px] text-sm text-left border rounded-lg ${
              isDark ? 'text-gray-300 bg-gray-900' : 'text-gray-800 bg-white'
            }`}
          >
            <thead className={`${isDark ? 'bg-gray-800' : 'bg-gray-100'} text-xs uppercase`}>
              <tr>
                <th className="px-6 py-3">Date Created</th>
                <th className="px-6 py-3">User Image</th>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Admin</th>
                <th className="px-6 py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className={`border-b transition-colors duration-200 ${
                    isDark
                      ? 'border-gray-700 hover:bg-gray-800'
                      : 'border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-10 h-10 object-cover rounded-full bg-gray-300"
                      />
                    
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                  
                      {user.username}
                 
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.isAdmin ? (<FaCheck className='text-green-500'/>) : (<FaTimes className='text-red-500' />)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span onClick={() =>{
                          setShowModal(true)
                          setUserIdToDelete(user._id)
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
          No User yet wait!
        </p>
      )}
      <Modal show={showModal} onClose={()=> setShowModal(false)} popup size='md'>
                  <ModalHeader/>
                  <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto h-14 w-14 text-gray-500 dark:text-gray-400" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                           Are you sure you want to delete this User?
                                </h3>
                               <div className="flex justify-center gap-4">
        <Button  className='bg-red-600' onClick={handleDeleteUser}>
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

export default DashUsers;
