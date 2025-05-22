import React from 'react'
import {Button } from 'flowbite-react';
import {AiFillGoogleCircle} from 'react-icons/ai'
import {GoogleAuthProvider, signInWithPopup ,getAuth} from 'firebase/auth'
import { app } from '../firebase.js';
import {useDispatch} from 'react-redux'
import {signInSuccess} from  '../redux/user/userSlice.js'
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const auth = getAuth(app);
    const dispatch  = useDispatch()
    const navigate = useNavigate();
    const handleGoogleClick = async () =>{
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt:'select_account'})
        try {
            const resultsFromGoogle = await signInWithPopup(auth , provider)
                const res = await fetch('/api/auth/google',{
                    method:'POST',
                    headers:{'Content-Type' : 'application/json'},
                    body:JSON.stringify({
                        name: resultsFromGoogle.user.displayName,
                        email:resultsFromGoogle.user.email,
                        googlePhotoURL: resultsFromGoogle.user.photoURL,
                    }),
                })
                const data = await res.json();
                if(res.ok){
                    dispatch(signInSuccess(data))
                    navigate('/')
                }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Button type='button' className='hover:bg-gradient-to-br from-pink-400 to-orange-500 ' outline onClick={handleGoogleClick} >
        <AiFillGoogleCircle className=' w-6 h-6 mr-2 text-black'/>
        Continue with Google
    </Button>
  )
}

export default OAuth