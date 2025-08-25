import HeroInfo from '@/components/HeroInfo/HeroInfo'
import Swiper from '@/components/SwiperFilm'
import allowedIds from '@/lib/allowedIds'
import { BaseCall } from '@/lib/BaseCall'

async function Tv({ params }) {

  const { id } = await params
  const uri = `/tv/${id}?language=it-IT`
  const serie = await BaseCall(uri)
  serie.media_type = 'tv'

  const seasons = serie?.seasons
  const entries = await Promise.all(
    seasons.map(async (s) => {
      const data = await BaseCall(`/tv/${id}/season/${s.season_number}?language=it-IT`);
      return [s.season_number, data.episodes];
    })
  );
  const episodes= Object.fromEntries(entries);
  
  const recommendations = await BaseCall(`/tv/${id}/recommendations?language=it-IT`)
  const series = await allowedIds(recommendations.results)

  return (
    <>
      <HeroInfo movie={serie} seasons={seasons} episodes={episodes} />
      <div className='mx-2'>
        <Swiper text='Raccomandati' movies={series} />

      </div>
    </>
  )
}

export default Tv