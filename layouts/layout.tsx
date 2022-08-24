import Header from '@components/header';

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <div className='mx-auto w-full max-w-[330px]'>
      <Header />
      {children}
    </div>
  );
}
