import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  HamburgerIcon,
  ProfileIcon,
  SettingsIcon,
  SignoutIcon,
  DashboardIcon,
  TablesIcon,
  FormsIcon,
  TabbedContentIcon,
  CalendarIcon,
  SupportIcon,
} from './icons';

export default function TSideBar() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {showSidebar ? (
        // <p
        //   className="fixed top-20 left-10 z-30 flex cursor-pointer items-center text-4xl text-teal-600"
        //   onClick={() => setShowSidebar(!showSidebar)}
        // >
        //   ❌
        // </p>

        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          xmlns='http://www.w3.org/2000/svg'
          className='fixed top-4 left-5 z-30 flex h-6 w-6 cursor-pointer items-center'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4.5 19.5l15-15m-15 0l15 15'
          />
        </svg>
      ) : (
        // <svg
        //   onClick={() => setShowSidebar(!showSidebar)}
        //   className="fixed top-20 left-10 z-20 flex cursor-pointer items-center"
        //   fill="rgb(14, 165, 233)"
        //   viewBox="0 0 100 80"
        //   width="40"
        //   height="40"
        // >
        //   <rect width="100" height="10" />
        //   <rect y="30" width="100" height="10" />
        //   <rect y="60" width="100" height="10" />
        // </svg>

        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          xmlns='http://www.w3.org/2000/svg'
          className={`fixed top-4 left-5 z-20 flex h-6 w-6 cursor-pointer items-center`}
          fill='rgb(14, 165, 233)'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      )}

      <div
        className={`fixed -left-52 top-0 z-20 h-screen w-52 
        bg-white p-10 text-white shadow-lg duration-300 ease-in-out 
        ${showSidebar ? 'translate-x-full ' : 'translate-x-0'}`}
        // transform overflow-auto 제거
      >
        <div className='pb-3'>
          <a
            href=''
            className='flex items-center pt-12 text-2xl font-semibold
            text-sky-600 hover:text-sky-700'
          >
            <SettingsIcon class='mr-3' />
            Admin
          </a>
        </div>
        <nav className='block w-40 pt-3 text-base font-semibold text-white'>
          <a
            href=''
            className='flex items-center py-4 pl-0 text-sky-600 opacity-75 hover:opacity-100'
          >
            <DashboardIcon class='mr-3' />
            Dashboard
          </a>
          <a
            href=''
            className='flex items-center py-4 pl-0 text-sky-600 opacity-75 hover:opacity-100'
          >
            <TablesIcon class='mr-3' />
            Tables
          </a>
          <a
            href=''
            className='flex items-center py-4 pl-0 text-sky-600 opacity-75 hover:opacity-100'
          >
            <FormsIcon class='mr-3' />
            Forms
          </a>
          <a
            href=''
            className='flex items-center py-4 pl-0 text-sky-600 opacity-75 hover:opacity-100'
          >
            <TabbedContentIcon class='mr-3' />
            Tabbed Content
          </a>
          <a
            href=''
            className='flex items-center py-4 pl-0 text-sky-600 opacity-75 hover:opacity-100'
          >
            <CalendarIcon class='mr-3' />
            Calendar
          </a>
          <a
            href=''
            className='flex items-center py-4 pl-0 text-sky-600 opacity-75 hover:opacity-100'
          >
            <SupportIcon class='mr-3' />
            Support
          </a>
        </nav>
      </div>
    </>
  );
}
