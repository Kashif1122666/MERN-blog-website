import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react';
import {useDispatch , useSelector}  from 'react-redux';
import {signInStart , signInSuccess , signInFailure} from '../redux/user/userSlice.js'
import OAuth from '../components/OAuth.jsx';

function SignIn() {

  const [formData , setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const   {theme}  = useSelector(state => state.theme);
  const handleChange = (e) => {
           setFormData({...formData , [e.target.id]: e.target.value.trim()})}
         const {loading , error:errorMessage} = useSelector(state => state.user);
  const handleSubmit = async (e) =>{
          e.preventDefault()
          if(!formData.email || !formData.password){
                      return dispatch(signInFailure('Please fill out all the fields'))
          }
          try {
                dispatch(signInStart());
            const res = await fetch('/api/auth/signin' ,{
              method:'POST',
              headers: {'Content-Type':'application/json'},
              body:JSON.stringify(formData),
            });
            const data = await res.json();
            if(data.success === false){
                    dispatch(signInFailure(data.message));
            }
            
            if(res.ok){
                dispatch(signInSuccess(data))
                 navigate('/')
            }
          } catch (error) {
              dispatch(signInFailure(error.message))
          }
  }
  return (
    <div className={`min-h-screen mt-20  ${theme === 'light' ? 'bg-white text-gray-700' : 'text-gray-200 bg-[rgb(16,23,42)]'} `}>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
          {/* left  */}
        <div className='flex-1'>
                 <Link to="/" className='  font-bold dark:text-white text-4xl'>
         <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Skills</span>
         Exchange
      </Link>
      <p className='text-sm mt-5'>
        You can sign in with your email and password or with Google.
      </p>
        </div>
        {/* right  */}
         <div className='flex-1'>
              <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
               
                <div >
                   <Label value='Your email'>Your Email</Label>
                   <TextInput type='email' placeholder='name@company.com' id='email'onChange={handleChange}/>
                </div>
                <div >
                   <Label value='Your password'>Your Password</Label>
                   <TextInput type='password' placeholder='**********' id='password'onChange={handleChange}/>
                </div>
                <Button  type='submit' className='bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-600 hover:to-pink-400' disabled={loading} >
                  {loading ? ( <> <Spinner size='sm'/>
                             <span className='pl-3'>Loading...</span></>
                               ) : 'Sign In'}
                </Button>
                <OAuth/>
              </form>
              <div className='flex gap-2 text-sm mt-5'>
                  <span> Don't Have an account?</span>
                  <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
              </div>
              {
                errorMessage && (
                  <Alert className='mt-5' color='failure'>
                    {errorMessage}
                  </Alert>
                )
              }
         </div>
      </div>
    </div>
  )
}

export default SignIn