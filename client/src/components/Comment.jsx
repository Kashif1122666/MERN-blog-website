import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux';
import {FaThumbsUp}  from 'react-icons/fa'
import { Button, Textarea } from 'flowbite-react';

const Comment = ({comment,onLike,onEdit, onDelete}) => {
  const [user , setUser] = useState({});
  const {theme} = useSelector(state => state.theme);
  const {currentUser} = useSelector(state => state.user);
  const [isEditing , setIsEditing ] = useState(false);
  const [editedContent,setEditedContent] = useState(comment.content);

    useEffect(()=>{
          const getUser = async()=>{
            try {
                 const res = await fetch(`/api/user/${comment.userId}`);
                 const data = await res.json();
                 if (res.ok) {
                    setUser(data);
                 }

            } catch (error) {
                console.log(error)
            }
          }
          getUser();
    },[comment]);


    const handleEdit = ()=>{
            setIsEditing(true)
            setEditedContent(comment.content)
    }

     const handleSave = async () =>{
        try {
           const res = await fetch(`/api/comment/editComment/${comment._id}`,{
              method:'PUT',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({content:editedContent})
           });
           if (res.ok) {
             setIsEditing(false)
             onEdit(comment,editedContent)
           }
        } catch (error) {
            console.log(error.message)
        }
     }
  return (
    <div className={`flex p-4 border-b ${theme === 'dark' ? 'border-gray-600' : ''} text-sm`}>
        <div className="flex-shrink-0 mr-3">
          <img className='w-10 h-10 rounded-full bg-gray-200' src={user.profilePicture} alt={user.username} />
        </div>
          <div className='flex-1'>
            <div className='flex items-center mb-1'>
              <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.username}` : 'anonymous user'}</span>
              <span className='text-gray-500 text-xs'>
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
            {isEditing ? (
              <>
               <Textarea className='mb-2'  value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                <div className='flex justify-end gap-2 text-xs'>
                  <Button onClick={handleSave} type='button' size='sm' className='bg-gradient-to-br from-purple-400 to-blue-500'>
                    Save
                  </Button>
                  <Button onClick={()=> setIsEditing(false)} type='button' size={'sm'} className='hover:bg-gradient-to-br hover:from-purple-400 hover:to-blue-500' outline>
                    Cancel
                  </Button>
                </div>
              </>
            ): (

                 <>
                 
                  <p className='text-gray-500 pb-2'>{comment.content}</p>
            <div className={`flex items-center pt-2 text-xs border-t ${theme === 'dark' ? 'border-gray-700' : ''} max-w-fit gap-2`}>
               <button type='button' onClick={()=>onLike(comment._id)} className={`text-gray-400 hover:text-blue-500 ${ currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500' }`}>
                <FaThumbsUp className='text-sm'/>
               </button>
               <p className='text-gray-400'>
                {
                  comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? 'like' : 'likes')
                }
               </p>
               {
                currentUser && currentUser._id  === comment.userId && (
                 <>
                  <button type='button' className='text-gray-400 hover:text-blue-500' onClick={handleEdit}>
                       Edit
                  </button>
                  <button type='button' className='text-gray-400 hover:text-red-500' onClick={()=> onDelete(comment._id)}>
                       Delete
                  </button>
                 </>
                )
               }
            </div>

                 </>

            )}
            
          </div>
    </div>
  )
}

export default Comment