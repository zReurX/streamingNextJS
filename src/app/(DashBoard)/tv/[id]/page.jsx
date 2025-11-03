import HeroInfo from "@/components/HeroInfo/HeroInfo";
import Swiper from "@/components/Swiper";
import allowedIds from "@/lib/allowedIds";
import tmdb from "@/lib/tmdb";
import { use } from "react";

function Tv({ params }) {
  const { id } = use(params);
  const serie = use(tmdb.tvShows.details(id));

  serie.media_type = "tv";

  const seasons = serie?.seasons;

  const entries = seasons.map((s) => {
    const data = use(
      tmdb.tvSeasons.details(
        { tvShowID: id, seasonNumber: s.season_number },
        null,
        { language: "it-IT" }
      )
    );
    return [s.season_number, data.episodes];
  });

  const episodes = Object.fromEntries(entries);

  const recommendations = use(
    tmdb.tvShows
      .recommendations(id, { language: "it-IT" })
      .then((res) => allowedIds(res.results))
  );
  return (
    <>
      <HeroInfo movie={serie} seasons={seasons} episodes={episodes} />
      <div className="mx-2">
        <Swiper title="Raccomandati">{recommendations}</Swiper>
      </div>
    </>
  );
}

export default Tv;
