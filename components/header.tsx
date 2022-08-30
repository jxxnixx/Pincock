import Link from 'next/link';

export default function Header() {
  return (
    <header className='fixed top-0 left-1/2 z-[9999] flex h-14 w-screen -translate-x-1/2 items-center justify-center bg-white shadow-md'>
      <Link href='/'>
        <a className='fixed font-black text-[#111030]'>Pincock</a>
      </Link>
    </header>
  );
}
