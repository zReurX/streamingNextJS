"use client";
import { Swiper as SwiperBase, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, A11y, Virtual } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import CardMedia from "./CardFilm/CardFilm";
import CardEpisode from "./CardEpisode/CardEpisode";

const Wrapper = ({wrap, children}) => {
  if (wrap) return <div className="md:pb-20">{children}</div> 
  return <div>{children}</div>
}


function Swiper({
  title = null,
  spaceBetween = 12,
  film = true,
  children,
}) {
  return (
    <Wrapper wrap={film}>
      {title && <h2 className="font-bold text-2xl mb-2">{title}</h2>}
      <SwiperBase
        style={{
          overflow: "visible",
        }}
        modules={[Navigation, FreeMode, A11y, Virtual]}
        spaceBetween={spaceBetween}
        freeMode={true}
        breakpoints={{
          320: { slidesPerView: 2 }, // telefoni piccoli
          480: { slidesPerView: 3 }, // telefoni grandi
          640: { slidesPerView: 3 }, // piccoli tablet
          768: { slidesPerView: 4 }, // tablet
          1024: { slidesPerView: 5 }, // desktop piccoli
          1280: { slidesPerView: 5 }, // desktop medi/grandi
        }}
        navigation
      >
        {children.map((item) => (
          <SwiperSlide key={item?.id}>
            {film ? <CardMedia media={item} /> : <CardEpisode ep={item} />}
          </SwiperSlide>
        ))}
      </SwiperBase>
    </Wrapper>
  );
}

export default Swiper;
