import HeroSection from "@/components/HeroSection";
import allowedIds from "@/lib/allowedIds";
import React, { use } from "react";
import tmdb from "@/lib/tmdb";
import Swiper from "@/components/Swiper";

function page() {
  //Trending TV
  const trendingTv = use(
    tmdb.trending
      .trending("tv", "day", {
        language: "it-IT",
      })
      .then((res) => allowedIds(res.results))
  );

  // Popular TV
  const popularTv = use(
    tmdb.tvShows
      .popular({ language: "it-IT" })
      .then((res) => allowedIds(res.results, "tv"))
  );

  const bestTv = trendingTv.shift();
  return (
    <main>
      <HeroSection movie={bestTv} />
      <div className="m-2">
        <Swiper title="Trending Tv">{trendingTv}</Swiper>
        <Swiper title="Popular Tv">{popularTv}</Swiper>
      </div>
    </main>
  );
}

export default page;
