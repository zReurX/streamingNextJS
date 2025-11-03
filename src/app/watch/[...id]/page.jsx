import { auth, signIn } from "@/lib/auth";
import BackLink from "./BackLink";
import { vixsrcPlaylist } from "@/lib/vixsrc";
import Player from "@/components/Player";
import { use } from "react";

function page({ params }) {
  const { id } = use(params);
  const [tmdbMovieId, seasonNumber, episodeNumber] = id;
  const session = use(auth());
  if (!session) use(signIn("", { redirectTo: `/${id[0]}/${id[1]}` }));
  const watch = {
    tmdbId: tmdbMovieId, 
    seasonId: seasonNumber,
    episodeId: episodeNumber
  }

  const hlsMasterPlaylistUrl = use(vixsrcPlaylist(...id));

  return (
    <div className="h-full w-full flex items-center justify-center">
      <BackLink />
      <Player link={hlsMasterPlaylistUrl} />
    </div>
  );
}

export default page;
