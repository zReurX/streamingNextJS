import HeroSection from "@/components/HeroSection";
import Swiper from "@/components/Swiper";
import allowedIds from "@/lib/allowedIds";
import { prisma } from "@/lib/prisma";
import tmdb from "@/lib/tmdb";
import { use } from "react";

export default function Home() {
  const trendigAllDay = use(
    tmdb.trending
    .trending("all", "day", { language: "it-IT" })
    .then((res) => allowedIds(res.results))
  );
  const bestFilm = trendigAllDay.shift();
  const startWatch = use(prisma.startWatch.findMany())
  console.log("startWatch", startWatch);
  return (
    <main>
      <HeroSection movie={bestFilm} />
      <div className="m-2">
        <Swiper title="Trending All">
          {trendigAllDay}
        </Swiper>
      </div>
    </main>
  );
}
