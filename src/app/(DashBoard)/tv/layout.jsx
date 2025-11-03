import Swiper from "@/components/Swiper";
import allowedIds from "@/lib/allowedIds";
import tmdb from "@/lib/tmdb";
import { use } from "react";

function layout({ children }) {
  // Generi
  const { genres } = use(tmdb.genres.tvShows({ language: "it-IT" }));
  // Fetch di films By Genre
  const tvsByGenres = genres.map((genre) => {
    return {
      id: genre.id,
      label: genre.name,
      results: use(
        tmdb.discover
          .tvShow({ with_genres: genre.id, language: "it-IT" })
          .then((res) => allowedIds(res.results, "movie"))
      ),
    };
  });
  return (
    <>
      {children}
      <div className="m-2">
        {tvsByGenres.map(
          (tv) =>
            tv.results?.length > 0 && (
              <Swiper key={tv.id} title={tv.label}>
                {tv.results}
              </Swiper>
            )
        )}
      </div>
    </>
  );
}

export default layout;
