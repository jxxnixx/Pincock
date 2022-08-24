import axios from 'axios';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Marker from '@public/icon/marker.png';
import { listApi } from '@libs/client/api';
import useSWR from 'swr';

declare global {
  interface Window {
    kakao: any;
  }
}

const Home: NextPage = () => {
  const { data, error } = useSWR('/pin/search/list', () =>
    listApi.getPinList(2)
  );

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
        const imageSrc = Marker.src; // 마커이미지의 주소
        const imageSize = new kakao.maps.Size(20, 20); // 마커이미지의 크기
        const imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션
        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
        const markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        const marker = new kakao.maps.Marker({
          map,
          position: pinList[i].latlng, // 마커를 표시할 위치
          title: pinList[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage,
        });

        marker.setMap(map); // 마커 생성
        marker.setDraggable(true); // 드래그 가능 마커
      }

      // 마커 클릭 이벤트
      // kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
      //   const latlng = mouseEvent.latLng; // 클릭한 위도, 경도 정보
      //   marker.setPosition(latlng); // 마커 위치를 클릭한 위치로 옮김
      //   // const message = `클릭한 위치의 위도는 ${latlng.getLat()}이고, 경도는 ${latlng.getLng()}입니다'`;
      //   // console.log(message);
      //   console.log('위도:', latlng.getLat(), '경도:', latlng.getLng());
      // });

      // 마우스 드래그로 지도 이동이 완료되었을 때 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(map, 'dragend', function () {
        // 지도 중심좌표
        const latlng = map.getCenter();
        console.log('위도:', latlng.getLat(), '경도:', latlng.getLng());
      });
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

  return <div id='map' className='h-screen w-full' />;
};

export default Home;
