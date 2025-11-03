
import EpisodesSelector from "./EpisodesSelector";

function HeroEpisodi({seasons, episodes }) {
  return (
    <div className="w-full">
      <EpisodesSelector
        seasons={seasons}
        episodesBySeason={episodes}
      />
    </div>
  )
}

export default HeroEpisodi