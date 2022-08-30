import { useRouter } from 'next/router';

interface TabProps {
  title?: string;
}

export default function Tab({ title }: TabProps) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };

  return (
    <header className='relative top-14 left-1/2 z-[9999] flex h-14 w-screen -translate-x-1/2 items-center justify-center bg-white shadow-md'>
      <span className='font-black text-[#111030]'>{title}</span>

      <button onClick={onClick} className='absolute left-4'>
        <svg
          className='h-6 w-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M15 19l-7-7 7-7'
          ></path>
        </svg>
      </button>
    </header>
  );
}
