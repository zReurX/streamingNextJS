import React from 'react'
import CardEpisode from './CardEpisode/CardEpisode'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, A11y, Virtual } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function SwiperEpisodes({ episodes }) {
    return (
        <Swiper
            modules={[Navigation, FreeMode, A11y, Virtual]}
            freeMode={true}
            spaceBetween={12}
            breakpoints={{
                320: { slidesPerView: 2 },   // telefoni piccoli
                480: { slidesPerView: 3 },   // telefoni grandi
                640: { slidesPerView: 3 },   // piccoli tablet
                768: { slidesPerView: 4 },   // tablet
                1024: { slidesPerView: 5 },  // desktop piccoli
                1280: { slidesPerView: 5 },  // desktop medi/grandi
            }}
            navigation
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            {episodes.map(episode => (
                <SwiperSlide key={episode?.id}>
                    <CardEpisode ep={episode} />
                </SwiperSlide>
            ))}

        </Swiper>
    )
}

export default SwiperEpisodes