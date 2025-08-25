import HeroInfo from '@/components/HeroInfo/HeroInfo'
import HeroSection from '@/components/HeroSection'
import Swiper from '@/components/SwiperFilm'
import allowedIds from '@/lib/allowedIds'
import { BaseCall } from '@/lib/BaseCall'

async function Movie({ params }) {

  const { id } = await params
  const uri = `/movie/${id}?language=it-IT`
  const movie = await BaseCall(uri)
  movie.media_type = 'movie'
  const recommendations = await BaseCall(`/movie/${id}/recommendations?language=it-IT`)
  const movies = await allowedIds(recommendations.results)

  console.log(movie)

  return (
    <main>
      <HeroInfo movie={movie} />
      <div className='mx-2'>
        <Swiper text='Raccomandati' movies={movies} />
      </div>
    </main>
  )
}

export default Movie