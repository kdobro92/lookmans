'use client'
import { useEffect } from 'react'

export default function KakaoMap() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_APP_KEY}&autoload=false`
      script.async = true

      script.onload = () => {
        // 스크립트가 로드된 후 kakao 객체를 사용합니다.
        if (window.kakao && window.kakao.maps) {
          // 카카오 지도 API를 로드합니다.
          window.kakao.maps.load(() => {
            const container = document.getElementById('map')
            if (container) {
              const options = {
                center: new window.kakao.maps.LatLng(37.5587, 127.0363),
                level: 3,
              }
              const map = new window.kakao.maps.Map(container, options)
              // 마커 추가할 위치 설정
              const position = new window.kakao.maps.LatLng(37.5587, 127.0363)
              // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
              var mapTypeControl = new kakao.maps.MapTypeControl()
              // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
              // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
              map.addControl(
                mapTypeControl,
                kakao.maps.ControlPosition.TOPRIGHT,
              )
              // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
              var zoomControl = new kakao.maps.ZoomControl()
              map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)
              var iwContent =
                  '<div id="showMap" style="padding:5px; font-size:12px; font-weight:bold; text-align:center; border-radius:4px; color:black;">룩맨즈헤어 <br><a href="https://map.kakao.com/link/map/룩맨즈헤어,37.5587,127.0363" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,37.5587,127.0363" style="color:blue" target="_blank">길찾기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                iwPosition = new kakao.maps.LatLng(37.5587, 127.0363) //인포윈도우 표시 위치입니다
              // 인포윈도우를 생성합니다
              var infowindow = new kakao.maps.InfoWindow({
                position: iwPosition,
                content: iwContent,
              })
              // 마커가 표시될 위치입니다
              var markerPosition = new kakao.maps.LatLng(37.5587, 127.0363)
              // 지도에 마커를 클릭하여 이동할 위치 설정
              map.setCenter(position)
              // 마커를 생성합니다
              var marker = new kakao.maps.Marker({
                position: markerPosition,
              })
              marker.setMap(map)
              // 마커 생성
              new window.kakao.maps.Marker({
                position: position,
                map: map,
              })

              // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
              infowindow.open(map, marker)
            }
          })
        }
      }

      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl shadow-navbar-light border-2 border-slate-200">
        <div id="map" className="mx-auto max-w-6xl h-[500px] px-6 lg:px-8" />
        <a
          href="https://map.naver.com/p/entry/place/1899977143?lng=127.036332&lat=37.5587158&placePath=%2Fbooking&entry=plt&searchType=place&c=15.00,0,0,0,dh"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="mx-auto max-w-6xl flex justify-between h-20">
            <div className="p-4 font-bold">
              <h4 className="text-black">룩맨즈헤어</h4>
              <p className="text-slate-400 text-sm">
                서을특별시 성동구 고산자로10길 22 2층 룩맨즈헤어
              </p>
            </div>
            <div></div>
            <div className="flex flex-col items-center p-4 font-bold">
              <img
                src="/images/reserve.jpg"
                alt="reserve naver"
                className="w-6 h-6"
              />
              <p className="pt-1 text-xs text-green-600">예약하기</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}
