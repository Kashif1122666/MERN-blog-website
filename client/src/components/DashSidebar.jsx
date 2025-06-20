import { HiUser, HiArrowSmRight, HiDocument, HiDocumentText, HiOutlineUserGroup, HiAnnotation, HiChartPie } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';


const DashSidebar = () => {
  const { theme } = useSelector(state => state.theme);
  const { search } = useLocation();
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.user);
  const tab = new URLSearchParams(search).get('tab');
   const handleSignout = async () => {
               try {
                 const res = await fetch('/api/user/signout', {
                   method: 'POST',
                 });
                  const data = await res.json();
                  if (!res.ok) {
                    console.log(data.message);
                  }else{
                    dispatch(signoutSuccess());
                  }
               } catch (error) {
                 console.log("Error signing out:", error);
               }
             };

  return (
    <aside className={`md:w-56 w-auto min-h-[unset] md:min-h-screen p-2 md:p-4 ${theme === 'dark' ? 'bg-[rgb(37,41,54)] text-gray-200' : 'bg-white text-gray-800 border-b md:border-r border-gray-200'}`}>
      <nav>
        <ul className="flex md:block space-x-2 md:space-x-0 md:space-y-2">
          {
            currentUser && currentUser.isSuperAdmin && (
              <li className="flex-1 md:flex-none">
            <Link 
              to='/dashboard?tab=dash'
              className={`flex items-center p-2 rounded-lg transition-colors ${
                tab === 'dash' 
                  ? (`bg-blue-100 text-blue-700 ${theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : ''}  `) 
                  : (`hover:bg-gray-100 ${theme === 'dark' ? 'hover:bg-gray-700/50' : ''} `)
              }`}
            >
              
              <HiChartPie className="mr-3 text-lg" />
              <span className="font-medium hidden md:inline">Dashboard</span>
              
            </Link>
          </li>
            )
          }
          <li className="flex-1 md:flex-none">
            <Link 
              to='/dashboard?tab=profile'
              className={`flex items-center p-2 rounded-lg transition-colors ${
                tab === 'profile' 
                  ? (`bg-blue-100 text-blue-700 ${theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : ''}  `) 
                  : (`hover:bg-gray-100 ${theme === 'dark' ? 'hover:bg-gray-700/50' : ''} `)
              }`}
            >
              
              <HiUser className="mr-3 text-lg" />
              <span className="font-medium hidden md:inline">Profile</span>
              <span className={`ml-auto bg-gray-100 ${theme === 'dark' ? 'bg-gray-700' : ''}  text-xs font-semibold px-2 py-0.5 rounded-full hidden md:inline`}>
                {currentUser.isSuperAdmin
  ? 'Super Admin'
  : currentUser.isAdmin
  ? 'Member'
  : 'User'}

              </span>
            </Link>
          </li>
          {
            currentUser.isAdmin && (
              <li className="flex-1 md:flex-none">
            <Link 
              to='/dashboard?tab=posts'
              className={`flex items-center p-2 rounded-lg transition-colors ${
                tab === 'posts' 
                  ? (`bg-blue-100 text-blue-700 ${theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : ''}  `) 
                  : (`hover:bg-gray-100 ${theme === 'dark' ? 'hover:bg-gray-700/50' : ''} `)
              }`}
            >
              
              <HiDocumentText className="mr-3 text-lg" />
              <span className="font-medium hidden md:inline">Posts</span>
              
            </Link>
          </li>
            )
          }
          {
            currentUser.isAdmin && (
              <li className="flex-1 md:flex-none">
            <Link 
              to='/dashboard?tab=users'
              className={`flex items-center p-2 rounded-lg transition-colors ${
                tab === 'users' 
                  ? (`bg-blue-100 text-blue-700 ${theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : ''}  `) 
                  : (`hover:bg-gray-100 ${theme === 'dark' ? 'hover:bg-gray-700/50' : ''} `)
              }`}
            >
              
              <HiOutlineUserGroup className="mr-3 text-lg" />
              <span className="font-medium hidden md:inline">Users</span>
              
            </Link>
          </li>
            )
          }
           {
            currentUser.isSuperAdmin && (
              <li className="flex-1 md:flex-none">
            <Link 
              to='/dashboard?tab=comments'
              className={`flex items-center p-2 rounded-lg transition-colors ${
                tab === 'comments' 
                  ? (`bg-blue-100 text-blue-700 ${theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : ''}  `) 
                  : (`hover:bg-gray-100 ${theme === 'dark' ? 'hover:bg-gray-700/50' : ''} `)
              }`}
            >
              
              <HiAnnotation className="mr-3 text-lg" />
              <span className="font-medium hidden md:inline">Comments</span>
              
            </Link>
          </li>
            )
          }
          <li className="flex-1 md:flex-none">
            <button className={`flex items-center justify-center md:justify-start w-full p-2 rounded-lg hover:bg-gray-100 ${theme === 'dark' ? 'hover:bg-gray-700/50' : ''}  transition-colors`}>
              <HiArrowSmRight className="mr-3 text-lg" />
              <span className="font-medium hidden md:inline" onClick={handleSignout}>Sign Out</span>
            </button>
          </li>

        </ul>
      </nav>
    </aside>
  );
};

export default DashSidebar;