import HeroInfo from "@/components/HeroInfo/HeroInfo";
import Swiper from "@/components/Swiper";

import allowedIds from "@/lib/allowedIds";
import tmdb from "@/lib/tmdb";
import { use } from "react";

function Movie({ params }) {
  const { id } = use(params);
  const movieDetails = use(tmdb.movies.details(id, undefined, "it-IT"));

  const moviesRecommendations = use(
    tmdb.movies
      .recommendations(id, { language: "it-IT" })
      .then((res) => allowedIds(res.results))
  );

  return (
    <main>
      <HeroInfo movie={movieDetails} />
      <div className="mx-2">
        <Swiper title="Raccomandati">{moviesRecommendations}</Swiper>
      </div>
    </main>
  );
}

export default Movie;
