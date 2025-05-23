import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashSidebar = () => {
  const { theme } = useSelector(state => state.theme);
  const { search } = useLocation();
  const tab = new URLSearchParams(search).get('tab');

  return (
    <aside className={`md:w-56 w-auto min-h-[unset] md:min-h-screen p-2 md:p-4 ${theme === 'dark' ? 'bg-[rgb(37,41,54)] text-gray-200' : 'bg-white text-gray-800 border-b md:border-r border-gray-200'}`}>
      <nav>
        <ul className="flex md:block space-x-2 md:space-x-0 md:space-y-2">
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
                User
              </span>
            </Link>
          </li>
          <li className="flex-1 md:flex-none">
            <button className={`flex items-center justify-center md:justify-start w-full p-2 rounded-lg hover:bg-gray-100 ${theme === 'dark' ? 'hover:bg-gray-700/50' : ''}  transition-colors`}>
              <HiArrowSmRight className="mr-3 text-lg" />
              <span className="font-medium hidden md:inline">Sign Out</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DashSidebar;