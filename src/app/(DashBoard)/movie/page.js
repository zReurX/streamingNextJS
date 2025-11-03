import HeroSection from "@/components/HeroSection";
import Swiper from "@/components/Swiper";
import allowedIds from "@/lib/allowedIds";
import tmdb from "@/lib/tmdb";
import { use } from "react";

function page() {
  //Trending Films
  const trendingFilms = use(
    tmdb.trending
      .trending("movie", "day", { language: "it-IT" })
      .then((res) => allowedIds(res.results))
  );

  // Popular Film
  const popularFilms = use(
    tmdb.movies
      .popular({ language: "it-IT" })
      .then((res) => allowedIds(res.results, "movie"))
  );

  const bestFilm = trendingFilms.shift();
  return (
    <main>
      <HeroSection movie={bestFilm} />
      <div className="m-2">
        <Swiper title="Trending Film">{trendingFilms}</Swiper>
        <Swiper title="Popular Film">{popularFilms}</Swiper>
      </div>
    </main>
  );
}

export default page;
