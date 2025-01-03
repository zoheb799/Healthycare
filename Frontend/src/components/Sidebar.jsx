import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ContactsIcon from '@mui/icons-material/Contacts';
import MapIcon from '@mui/icons-material/Map';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden md:flex flex-col h-full bg-gray-800 text-white ${!isOpen ? 'w-64' : 'w-16'} transition-all duration-300`}>
        <IconButton onClick={toggleSidebar} className="p-4 text-white">
          {!isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
        <nav className="mt-10 flex-1">
          <ul>
            <li className={`mb-4 relative group flex items-center ${isOpen ? 'justify-center' : 'justify-start'}`}>
              <Link to= '/contacts' className="flex items-center p-2 hover:bg-gray-700 rounded">
                <ContactsIcon />
                <span className={`${isOpen && 'hidden'} ml-4`}>Contacts</span>
              </Link>
              {isOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-700 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Contacts
                </span>
              )}
            </li>
            <li className={`mb-4 relative group flex items-center ${isOpen ? 'justify-center' : 'justify-start'}`}>
              <Link className="flex items-center p-2 hover:bg-gray-700 rounded">
                <MapIcon />
                <span className={`${isOpen && 'hidden'} ml-4`}>Maps & Charts</span>
              </Link>
              {isOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-700 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Maps & Charts
                </span>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className={`flex flex-col h-full bg-gray-800 text-white md:hidden ${isOpen ? 'w-64' : 'w-16'} transition-all duration-300`}>
        <IconButton onClick={toggleSidebar} className="p-4 text-white">
          {!isOpen ? <MenuIcon /> : <ChevronLeftIcon />}
        </IconButton>
        <nav className="mt-10 flex-1">
          <ul>
            <li className={`mb-4 relative group flex items-center ${!isOpen ? 'justify-center' : 'justify-start'}`}>
              <Link to="/contacts" className="flex items-center p-2 hover:bg-gray-700 rounded" onClick={handleNavClick}>
                <ContactsIcon />
                <span className={`${!isOpen && 'hidden'} ml-4`}>Contacts</span>
              </Link>
              {!isOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-700 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Contacts
                </span>
              )}
            </li>
            <li className={`mb-4 relative group flex items-center ${!isOpen ? 'justify-center' : 'justify-start'}`}>
              <Link to="/charts-maps" className="flex items-center p-2 hover:bg-gray-700 rounded" onClick={handleNavClick}>
                <MapIcon />
                <span className={`${!isOpen && 'hidden'} ml-4`}>Maps & Charts</span>
              </Link>
              {!isOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-700 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Maps & Charts
                </span>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
