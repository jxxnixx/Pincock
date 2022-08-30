// import axios from 'axios';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import OrangeMarker from '@public/icon/orange-marker.png';
import PurpleMarker from '@public/icon/purple-marker.png';
import { pinApi } from '@libs/client/api';
import useSWR from 'swr';
import Layout from '@layouts/layout';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { FieldErrors, useForm } from 'react-hook-form';
import { mapIcons } from '@components/svg';
import { cls } from '@libs/client/utils';

declare global {
  interface Window {
    kakao: any;
  }
}

interface IForm {
  title: string;
  list: string;
  description: string;
  type: string;
}

const popupVar: Variants = {
  invisible: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const Home: NextPage = () => {
  const { data, error } = useSWR('/pin/search/user', () =>
    pinApi.getPinList(13)
  );

  const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'onChange',
  });
  const onValid = async (data: IForm) => {
    console.log(data);
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  const latitude: number = 33.450701;
  const longitude: number = 126.570667;
  // const [isLoading, setIsLoading] = useState<boolean>(false)

  const onLoadKakaoMap = () => {
    console.log(data);

    const { kakao } = window;

    kakao.maps.load(() => {
      const container = document.querySelector('#map');
      const options = {
        center: new kakao.maps.LatLng(latitude, longitude),
      };
      const map = new kakao.maps.Map(container, options);

      // const markerPosition = new kakao.maps.LatLng(latitude, longitude); // 마커 초기 위치

      const pinList = data?.pinList.map((pin: { [key: string]: any }) => ({
        title: pin.title,
        latlng: new kakao.maps.LatLng(pin.latitude, pin.longitude),
      }));

      for (var i = 0; i < pinList?.length; i++) {
        const imageSrc = OrangeMarker.src; // 마커이미지의 주소
        const imageSize = new kakao.maps.Size(20, 20); // 마커이미지의 크기
        // const imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션
        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
        const markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize
          // imageOption
        );

        const marker = new kakao.maps.Marker({
          map,
          position: pinList[i].latlng, // 마커를 표시할 위치
          title: pinList[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage,
          clickable: true,
        });

        marker.setMap(map); // 마커 생성
        marker.setDraggable(true); // 드래그 가능 마커

        // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
        const iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

        // 인포윈도우를 생성합니다
        const infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', () => {
          // 마커 위에 인포윈도우를 표시합니다
          infowindow.open(map, marker);
        });
      }

      const imageSrc = PurpleMarker.src; // 마커이미지의 주소
      const imageSize = new kakao.maps.Size(20, 20); // 마커이미지의 크기

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const marker = new kakao.maps.Marker({
        // map,
        // position: latlng, // 마커를 표시할 위치
        image: markerImage,
      });

      marker.setMap(map); // 마커 생성
      marker.setDraggable(true); // 드래그 가능 마커

      /** 마커 클릭 이벤트 */
      kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
        const latlng = mouseEvent.latLng; // 클릭한 위도, 경도 정보
        marker.setPosition(latlng); // 마커 위치를 클릭한 위치로 옮김
        console.log(
          '새로운 마커 생성 -',
          '위도:',
          latlng.getLat(),
          '경도:',
          latlng.getLng()
        );
        setIsPopupOpened(true);
      });

      /** 마우스 드래그로 지도 이동이 시작되었을 때 마지막 파라미터로 넘어온 함수 호출 이벤트 등록 */
      kakao.maps.event.addListener(map, 'dragstart', () => {
        setIsPopupOpened(false);
      });

      // /** 마우스 드래그로 지도 이동이 완료되었을 때 마지막 파라미터로 넘어온 함수 호출 이벤트 등록 */
      // kakao.maps.event.addListener(map, 'dragend', function () {
      //   // 지도 중심좌표
      //   const latlng = map.getCenter();
      //   console.log('위도:', latlng.getLat(), '경도:', latlng.getLng());
      // });
    });
  };

  // 지도 load
  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&autoload=false`;

    document.head.appendChild(mapScript);

    mapScript.addEventListener('load', onLoadKakaoMap);
    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, [data]);

  return (
    <Layout isMap>
      <div id='map' className='relative h-screen w-full'>
        <AnimatePresence>
          {isPopupOpened && (
            <motion.div
              variants={popupVar}
              initial='invisible'
              animate='visible'
              exit='exit'
              className='absolute top-1/2 left-1/2 z-[9999] w-72 !-translate-x-1/2 !-translate-y-1/2 rounded-lg bg-white p-4 shadow-xl'
            >
              <div className='flex space-x-2 text-xs'>
                <input
                  type='text'
                  placeholder='장소명'
                  {...register('title', {
                    required: '장소명을 입력해주세요',
                  })}
                  className='h-8 w-44 rounded bg-[#eef3ff] px-2.5 outline-none'
                />

                <div className='flex h-8 grow items-center justify-center space-x-1 rounded border border-[#eef3ff] text-xs shadow-sm'>
                  <div>리스트</div>

                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-3.5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                    />
                  </svg>
                </div>
              </div>

              <input
                type='text'
                placeholder='세부 설명'
                {...register('description', {
                  required: '세부 설명을 입력해주세요',
                })}
                className='mt-1.5 h-8 w-full rounded border border-[#eef3ff] px-2.5 text-xs outline-none'
              />

              <div className='mt-2.5 pl-1.5 text-[0.5rem]'>아이콘 선택</div>

              <div className='mt-1.5 flex justify-between'>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i}>
                    <input
                      id={`icon${i}`}
                      type='radio'
                      value={i}
                      {...register('type', {
                        required: '아이콘을 선택해주세요',
                      })}
                      className='hidden'
                    />

                    <label
                      htmlFor={`icon${i}`}
                      className={cls(
                        watch('type') === JSON.stringify(i)
                          ? 'bg-[#5470f8]'
                          : '',
                        'flex aspect-square w-8 items-center justify-center rounded-md border border-[#eef3ff] shadow-sm transition-all'
                      )}
                    >
                      {i === 0
                        ? mapIcons.cocktail(watch('type') === JSON.stringify(i))
                        : i === 1
                        ? mapIcons.plane(watch('type') === JSON.stringify(i))
                        : i === 2
                        ? mapIcons.heart(watch('type') === JSON.stringify(i))
                        : i === 3
                        ? mapIcons.caves(watch('type') === JSON.stringify(i))
                        : i === 4
                        ? mapIcons.coffee(watch('type') === JSON.stringify(i))
                        : mapIcons.food(watch('type') === JSON.stringify(i))}
                    </label>
                  </div>
                ))}
              </div>

              <div className='mt-5 flex justify-center space-x-2'>
                <div
                  onClick={handleSubmit(onValid, onInvalid)}
                  className='flex h-8 w-20 items-center justify-center rounded bg-[#5470f8] text-xs text-white'
                >
                  저장
                </div>

                <div
                  onClick={() => setIsPopupOpened(false)}
                  className='flex h-8 w-20 items-center justify-center rounded bg-gray-500 text-xs text-white'
                >
                  취소
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default Home;
