import HeroSection from '@/components/HeroSection'
import Swiper from '@/components/Swiper'
import allowedIds from '@/lib/allowedIds'
import { BaseCall } from '@/lib/BaseCall'

async function Tv({ params }) {

  const { id } = await params
  const uri = `/tv/${id}?language=it-IT`
  const serie = await BaseCall(uri)
  const recommendations = await BaseCall(`/tv/${id}/recommendations`)
  const series = await allowedIds(recommendations.results)

  return (
    <>
      <HeroSection movie={serie} />
      <Swiper movies={series} />
    </>
  )
}

export default Tv