import Link from 'next/link';
import ProfileBtn from './profileBtn';
import TSideBar from './tsidebar';

export default function Header() {
  return (
    <header className='fixed top-0 left-1/2 z-10 flex h-14 w-screen -translate-x-1/2 items-center justify-center bg-white shadow-md'>
      <TSideBar />

      <ProfileBtn />

      <Link href='/'>
        <a className='fixed z-10 font-black text-[#111030]'>Pincock</a>
      </Link>
    </header>
  );
}
