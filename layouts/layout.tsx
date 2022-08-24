import { cls } from '@libs/client/utils';

interface IProps {
  isMap?: boolean;
  children: React.ReactNode;
}

export default function Layout({ isMap = false, children }: IProps) {
  return (
    <div className={cls('mx-auto w-full', isMap ? '' : 'max-w-[330px]')}>
      {children}
    </div>
  );
}
