import HeroSection from '@/components/HeroSection'
import { BaseCall } from '@/lib/BaseCall'

async function Movie({ params }) {

  const { id } = await params
  const uri = `/movie/${id}?language=it-IT`
  const movie = await BaseCall(uri)

  return (
    <>
      <HeroSection movie={movie} />
    </>
  )
}

export default Movie