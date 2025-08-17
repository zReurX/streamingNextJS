import HeroSection from "@/components/HeroSection";
import Swiper from "@/components/Swiper";
import { BaseCall } from "@/lib/BaseCall";
import Image from "next/image";

export default async function Home() {

  const uri = '/movie/popular?language=it-IT&page=1'

  const getPopularFilm = async () => {
    const data = await BaseCall(uri)
    return await data.results
  }

  const popularFilms = await getPopularFilm()
  const bestFilm = popularFilms.shift()

  return (
    <main>
      <HeroSection movie={bestFilm} />
      <div className="mx-2">
        <Swiper text="Popular Film" movies={popularFilms} />
        <Swiper movies={popularFilms} />

      </div>
    </main>
  );
}
