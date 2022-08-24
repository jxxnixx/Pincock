import Header from '@components/header';

interface IProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: IProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
