import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react';
import OAuth from '../components/OAuth';
import { useSelector } from 'react-redux';

function SignUp() {

  const [formData , setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
           setFormData({...formData , [e.target.id]: e.target.value.trim()})
           
  }

  const [errorMessage , setErrorMessage] = useState(null);
  const [loading , setLoading] = useState(false);
  const   {theme}  = useSelector(state => state.theme);
  const handleSubmit = async (e) =>{
          e.preventDefault()
          if(!formData.username || !formData.email || !formData.password){
                      return setErrorMessage("Please fill Out all fields");
          }
          try {
            setLoading(true)
            setErrorMessage(null)
            const res = await fetch('/api/auth/signup' ,{
              method:'POST',
              headers: {'Content-Type':'application/json'},
              body:JSON.stringify(formData),
            });
            const data = await res.json();
            if(data.success === false){
                    return setErrorMessage(data.message)
            }
            setLoading(false)
            if(res.ok){
                 navigate('/sign-in')
            }
          } catch (error) {
              setErrorMessage(error.message);
              setLoading(false)
          }finally{
            setLoading(false);
          }
  }
  return (
    <div className={`min-h-screen mt-20  ${theme === 'light' ? 'bg-white text-gray-700' : 'text-gray-200 bg-[rgb(16,23,42)]'} `} >
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
              <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div >
                   <Label value='Your username'>Your username</Label>
                   <TextInput type='text' placeholder='username' id='username' onChange={handleChange} />
                </div>
                <div >
                   <Label value='Your email'>Your Email</Label>
                   <TextInput type='email' placeholder='name@company.com' id='email'onChange={handleChange}/>
                </div>
                <div >
                   <Label value='Your password'>Your Password</Label>
                   <TextInput type='password' placeholder='Password' id='password'onChange={handleChange}/>
                </div>
                <Button  type='submit' className='bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-600 hover:to-pink-400' disabled={loading} >
                  {loading ? ( <> <Spinner size='sm'/>
                             <span className='pl-3'>Loading...</span></>
                               ) : 'Sign Up'}
                </Button>
                <OAuth/>
              </form>
              <div className='flex gap-2 text-sm mt-5'>
                  <span>Have an account?</span>
                  <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
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

export default SignUp