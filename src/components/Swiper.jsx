// Import Swiper React components
'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Pagination, A11y, Virtual } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import CardFilm from './CardFilm';

export default ({ text='PlaceHolde...', movies }) => {

  return (
    <div className='md:pb-20'>
        <h2 className='font-bold text-2xl mb-2'>{text}</h2>
        <Swiper
            style={{
                overflow:'visible'
            }}
        modules={[Navigation, FreeMode, A11y, Virtual]}
        spaceBetween={12}
        freeMode={true}
        breakpoints={{
            320: { slidesPerView: 2 },   // telefoni piccoli
            480: { slidesPerView: 2 },   // telefoni grandi
            640: { slidesPerView: 3 },   // piccoli tablet
            768: { slidesPerView: 4 },   // tablet
            1024: { slidesPerView: 5 },  // desktop piccoli
            1280: { slidesPerView: 5 },  // desktop medi/grandi
        }}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        >
        {movies?.map((movie, index) => (
            <SwiperSlide key={movie.id} className='w-full'>
                <CardFilm movie={movie} />
            </SwiperSlide>
        ))}
        </Swiper>
    </div>
  );
};