import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Label, TextInput} from 'flowbite-react';

function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
          {/* left  */}
        <div className='flex-1'>
                 <Link to="/" className='  font-bold dark:text-white text-4xl'>
         <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Skills</span>
         Exchange
      </Link>
      <p className='text-sm mt-5'>
        You can SignUp with your email and password or with Google.
      </p>
        </div>
        {/* right  */}
         <div className='flex-1'>
              <form className='flex flex-col gap-4'>
                <div >
                   <Label value='Your username'>Your username</Label>
                   <TextInput type='text' placeholder='username' id='username'/>
                </div>
                <div >
                   <Label value='Your email'>Your Email</Label>
                   <TextInput type='text' placeholder='name@company.com' id='email'/>
                </div>
                <div >
                   <Label value='Your password'>Your Password</Label>
                   <TextInput type='text' placeholder='Password' id='password'/>
                </div>
                <Button gradientDuoTone='purpleToPink' type='submit' className='bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-600 hover:to-pink-400' >Sign up</Button>
              </form>
              <div className='flex gap-2 text-sm mt-5'>
                  <span>Have an account?</span>
                  <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
              </div>
         </div>
      </div>
    </div>
  )
}

export default SignUp