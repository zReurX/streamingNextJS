import HeroSection from '@/components/HeroSection'
import Swiper from '@/components/Swiper'
import allowedIds from '@/lib/allowedIds'
import { BaseCall } from '@/lib/BaseCall'

async function Movie({ params }) {

  const { id } = await params
  const uri = `/movie/${id}?language=it-IT`
  const movie = await BaseCall(uri)
  movie.media_type = 'movie'
  const recommendations = await BaseCall(`/movie/${id}/recommendations`)
  const movies = await allowedIds(recommendations.results)

  console.log(movies)

  return (
    <>
      <HeroSection movie={movie} />
      <Swiper text='Raccomandati' movies={movies} />
    </>
  )
}

export default Movie