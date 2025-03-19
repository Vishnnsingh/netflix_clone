import React, { useState, useEffect } from 'react';
import { IoIosArrowDropdown, IoIosSearch, IoMdClose } from "react-icons/io";
import { RiMenu3Line } from "react-icons/ri";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { userAuthstore } from '../store/authUser';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Zustand store for user authentication
  const { user, logout } = userAuthstore();

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Redirect user to login if logged out
  useEffect(() => {
    if (!user) {
      navigate('/'); // Redirect to login page
    }
  }, [user, navigate]);

  // Handle scroll event for header background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to login after logout
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 
      ${scrolled || showSearch || mobileMenuOpen ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent'}`}>
      
      <div className="max-w-[1800px] mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/browse">
            <img
              className='w-20 sm:w-28'
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt="Netflix"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex ml-8 text-white">
            {["browse", "tv-shows", "movies", "new-and-popular", "my-list"].map((path) => (
              <Link key={path} to={`/${path}`} className={`mx-3 hover:text-gray-300 transition-colors ${location.pathname === `/${path}` ? 'font-bold' : ''}`}>
                {path.replace('-', ' ').toUpperCase()}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white mr-4" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <IoMdClose size={24} /> : <RiMenu3Line size={24} />}
        </button>

        {/* User Controls */}
        <div className='flex items-center text-white'>
          
          {/* Search Bar */}
          <div className="relative mr-4">
            {showSearch ? (
              <form onSubmit={handleSearch} className="absolute right-0 top-0 bg-black bg-opacity-90 border border-gray-700 rounded-md flex overflow-hidden">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Titles, people, genres"
                  className="bg-transparent text-white px-4 py-2 outline-none w-48 sm:w-64"
                  autoFocus
                />
                <button type="submit" className="px-3 text-white hover:text-red-600 transition-colors">
                  <IoIosSearch size={22} />
                </button>
                <button type="button" onClick={() => setShowSearch(false)} className="px-3 text-white hover:text-red-600 transition-colors">
                  <IoMdClose size={22} />
                </button>
              </form>
            ) : (
              <button onClick={() => setShowSearch(true)} className="hover:text-red-600 transition-colors">
                <IoIosSearch size={24} />
              </button>
            )}
          </div>

          {/* User Profile or Login Button */}
          {user ? (
            <div className="hidden sm:flex items-center">
              <div className="flex items-center mr-4">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-2">
                  {user.fullname ? user.fullname.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-sm font-medium hidden sm:block">{user.fullname}</span>
              </div>
              <button onClick={handleLogout} className='bg-red-600 text-white px-4 py-1.5 rounded-md hover:bg-red-700 transition-colors text-sm font-medium'>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className='bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium'>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
