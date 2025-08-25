import HeroSection from "@/components/HeroSection";
import Swiper from "@/components/SwiperFilm";
import allowedIds from "@/lib/allowedIds";
import { BaseCall } from "@/lib/BaseCall";
import Image from "next/image";

export default async function Home() {

  const uri = '/trending/all/day?language=it-IT&page=1'

  const getPopularFilm = async () => {
    const data = await BaseCall(uri)
    return await allowedIds(data.results)
  }

  const popularFilms = await getPopularFilm()
  const bestFilm = popularFilms.shift()

  return (
    <main>
      <HeroSection movie={bestFilm} />
      <div className="m-2">
        <Swiper text="Trending All" movies={popularFilms} />

      </div>
    </main>
  );
}
