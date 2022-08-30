import MapTab from '@components/maptab';
import { cls } from '@libs/client/utils';
import Tab from 'components/tab';

export interface IProps {
  isMap?: boolean;
  canGoBack?: boolean;
  children: React.ReactNode;

  title?: string;
}

export default function Layout({
  isMap = false,
  canGoBack,
  children,

  title,
}: IProps) {
  return (
    <>
      {canGoBack ? <Tab title={title} /> : null}
      {isMap ? <MapTab /> : null}

      <div className={cls('mx-auto w-full', isMap ? '' : 'max-w-[330px]')}>
        {children}
      </div>
    </>
  );
}
