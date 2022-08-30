import { useState } from 'react';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {showSidebar ? (
        <p
          className='relative left-10 top-6 z-30 flex cursor-pointer items-center text-4xl text-white'
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </p>
      ) : (
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          className='relative left-10 top-6 z-30 flex cursor-pointer items-center'
          fill='#2563EB'
          viewBox='0 0 100 80'
          width='40'
          height='40'
        >
          <rect width='100' height='10'></rect>
          <rect y='30' width='100' height='10'></rect>
          <rect y='60' width='100' height='10'></rect>
        </svg>
      )}

      <div
        className={` relative top-0 left-0 z-30  h-full w-[35vw] transform overflow-auto bg-blue-600 p-10 pr-20 text-white duration-300 ease-in-out ${
          showSidebar ? 'translate-x-0 ' : 'translate-x-full'
        }`}
      >
        <h2 className='mt-20 text-4xl font-semibold text-white'>
          I am a sidebar
        </h2>
      </div>
    </>
  );
};

export default Sidebar;
