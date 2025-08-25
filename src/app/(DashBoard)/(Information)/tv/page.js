import HeroSection from '@/components/HeroSection'
import allowedIds from '@/lib/allowedIds'
import { BaseCall } from '@/lib/BaseCall'
import React from 'react'
import Swiper from "@/components/SwiperFilm";

async function page() {
  const trending = '/trending/tv/day?language=it-IT&page=1'
  const popular = '/tv/popular?language=it-IT&page=1'
  
    const getPopularFilm = async (uri) => {
      const data = await BaseCall(uri)
      return await allowedIds(data.results)
    }

    const trendingTv = await getPopularFilm(trending)
    const popularTv = await getPopularFilm(popular)
    const bestTv = trendingTv.shift()
  return (
    <main>
      <HeroSection movie={bestTv} />
      <div className="m-2">
        <Swiper text="Trending Tv" movies={trendingTv} />
        <Swiper text="Popular Tv" movies={popularTv} />

      </div>
    </main>
  )
}

export default page