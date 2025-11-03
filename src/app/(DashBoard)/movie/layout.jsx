import Swiper from "@/components/Swiper";
import allowedIds from "@/lib/allowedIds";
import tmdb from "@/lib/tmdb";
import { use } from "react";

function layout({ children }) {
  // Generi
  const { genres } = use(tmdb.genres.movies({ language: "it-IT" }));
  // Fetch di films By Genre
  const filmsByGenres = genres.map((genre) => {
    return {
      id: genre.id,
      label: genre.name,
      results: use(
        tmdb.discover
          .movie({ with_genres: genre.id, language: "it-IT" })
          .then((res) => allowedIds(res.results, "movie"))
      ),
    };
  });
  return (
    <>
      {children}
      <div className="m-2">
        {filmsByGenres.map(
          (movie) =>
            movie.results?.length > 0 && (
              <Swiper key={movie.id} title={movie.label}>
                {movie.results}
              </Swiper>
            )
        )}
      </div>
    </>
  );
}

export default layout;
