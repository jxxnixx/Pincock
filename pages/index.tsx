import Layout from '@layouts/layout';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <div className='mt-14 flex w-full flex-col bg-slate-200 text-lg font-medium '>
        <Link href='/'>
          <a className={router.pathname === '/' ? 'active' : ''}>Home</a>
        </Link>
        <Link href='/signup'>
          <a className={router.pathname === '/signup' ? 'active' : ''}>
            Sign Up
          </a>
        </Link>
        <Link href='/login'>
          <a className={router.pathname === '/login' ? 'active' : ''}>Log In</a>
        </Link>
        <Link href='/practice'>
          <a className={router.pathname === '/practice' ? 'active' : ''}>
            Practice
          </a>
        </Link>
        <Link href='/practice2'>
          <a className={router.pathname === '/practice2' ? 'active' : ''}>
            Practice2
          </a>
        </Link>
        <Link href='/map'>
          <a className={router.pathname === '/map' ? 'active' : ''}>map</a>
        </Link>
        <Link href='/profile'>
          <a className={router.pathname === '/profile' ? 'active' : ''}>
            profile
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
