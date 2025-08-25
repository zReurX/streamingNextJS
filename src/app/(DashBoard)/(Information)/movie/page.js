import HeroSection from '@/components/HeroSection'
import allowedIds from '@/lib/allowedIds'
import { BaseCall } from '@/lib/BaseCall'
import React from 'react'
import Swiper from "@/components/SwiperFilm";

async function page() {
  const trending = '/trending/movie/day?language=it-IT&page=1'
  const popular = '/movie/popular?language=it-IT&page=1'
  
    const getPopularFilm = async (uri) => {
      const data = await BaseCall(uri)
      return await allowedIds(data.results)
    }

    const trendingFilms = await getPopularFilm(trending)
    const popularFilms = await getPopularFilm(popular)
    const bestFilm = trendingFilms.shift()
  return (
    <main>
      <HeroSection movie={bestFilm} />
      <div className="m-2">
        <Swiper text="Trending Film" movies={trendingFilms} />
        <Swiper text="Popular Film" movies={popularFilms} />

      </div>
    </main>
  )
}

export default page