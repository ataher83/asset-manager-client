import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './banner.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide> */}
        <SwiperSlide className='relative'>
          <img className='w-full h-48' src="https://i.ibb.co/ScTPXnh/HR.png" alt="" />
          <button
            // onClick={() => history.push('/hr-manager')}
            className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded  absolute"
          >
            Join as HR Manager
          </button>
        </SwiperSlide>
        <SwiperSlide className='relative'>
          <img className='w-full h-48' src="https://i.ibb.co/HdZ61wr/employee.png" alt="" />
          <button
            // onClick={() => history.push('/hr-manager')}
            className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded  absolute"
          >
            Join as Employee
          </button>
        </SwiperSlide>
        {/* <SwiperSlide><img className='w-full h-96' src="https://i.postimg.cc/tTYYTc1m/14.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img className='w-full h-96' src="https://i.postimg.cc/pXqgFmmX/15.jpg" alt="" /></SwiperSlide> */}
        

      </Swiper>
    </>
  );
}
