import React from 'react'
import {Link , useLocation} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon , FaSun} from 'react-icons/fa'
import { Navbar, Button, TextInput, Dropdown, Avatar ,DropdownHeader, DropdownItem, DropdownDivider, } from 'flowbite-react';
import { HiMenu } from 'react-icons/hi';
import { useState } from 'react';
import {useSelector , useDispatch} from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const  {currentUser} = useSelector(state => state.user);
  const   {theme}  = useSelector(state => state.theme);
  return (
    <Navbar className={`border-b-2 ${theme === 'light' ? 'bg-white text-gray-700' : 'text-gray-200 bg-[rgb(16,23,42)]'}`} >
      <Link to="/" className={`self-center whitespace-nowrap text-sm  sm:text-xl font-bold ${theme === 'dark' ? 'text-white' : ''}`}>
         <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Skills</span>
         Exchange
      </Link>
      <form>
        <TextInput 
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <div className="hidden lg:flex items-center gap-4 ml-4">
  <Link
    to="/home"
    className={`block py-1 ${
      path === '/home'
        ? 'text-blue-600 rounded px-2'
        : (` ${theme === 'dark' ?  'text-white' : ' text-gray-700'} `)
    }`}
  >
    Home
  </Link>
  <Link
    to="/about"
    className={`block py-1 ${
      path === '/about'
        ? 'text-blue-600 rounded px-2'
        :(` ${theme === 'dark' ?  'text-white' : ' text-gray-700'} `)
    }`}
  >
    About
  </Link>
  <Link
    to="/projects"
    className={`block py-1 ${
      path === '/projects'
        ? ' text-blue-600 rounded px-2'
        : (` ${theme === 'dark' ?  'text-white' : ' text-gray-700'} `)
    }`}
  >
    Projects
  </Link>
</div>

      <Button className='w-12 h-10 lg:hidden ' color='light' pill>
      <AiOutlineSearch />
      </Button >
      <div className='flex gap-2 md:order-2'>
        <Button className={`w-12 h-10 hidden sm:inline `}  color='light' pill onClick={()=>dispatch(toggleTheme())}>
          {theme === 'light' ?  <FaSun/> :  <FaMoon  />}
        </Button >
         {
            currentUser ? (
              <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.profilePicture} rounded />}>
              <DropdownHeader>
                     <span className='block text-sm'>@{currentUser.username}</span>
                     <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
              </DropdownHeader>
              <Link to='/dashboard?tab=profile'>
              <DropdownItem> Profile </DropdownItem>
              <DropdownDivider/>
              <DropdownItem> Sign out </DropdownItem>
              </Link>

              </Dropdown>
            ) : (
                <Link to='/sign-in'>
         <Button  outline >
            Sign in
          </Button>
        </Link>
            )
          }
      
         
   {/* Collapse Menu for Mobile */}
{/* Hamburger Icon Button */}
<button
  className={`lg:hidden p-2 text-gray-700 ${theme === 'dark' ? 'text-white' : ''}`}
  onClick={() => setMenuOpen(!menuOpen)}
>
  <HiMenu className="w-6 h-6" />
</button>
{menuOpen && (
  <div className={`lg:hidden absolute top-16 right-2 bg-white ${theme === 'dark' ? 'bg-gray-800' : ''} rounded shadow-md p-4 z-50`}>
    <Link
  to="/home"
  className={`block py-1 ${
    path === '/home'
      ? 'bg-blue-500 text-white rounded px-2'
      : (` ${theme === 'dark' ?  'text-white' : ' text-gray-700'} `)
  }`}
>
      Home
    </Link>
    <Link
  to="/about"
  className={`block py-1 ${
    path === '/about'
      ? 'bg-blue-500 text-white rounded px-2'
      : (` ${theme === 'dark' ?  'text-white' : ' text-gray-700'} `)
  }`}
>
      About
    </Link>
    <Link
  to="/projects"
  className={`block py-1 ${
    path === '/projects'
      ? 'bg-blue-500 text-white rounded px-2'
      : (` ${theme === 'dark' ?  'text-white' : ' text-gray-700'} `)
  }`}
>
      Projects
    </Link>
  </div>
)}

      </div>
    </Navbar>
  )
}

export default Header
