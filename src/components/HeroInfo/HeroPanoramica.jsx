import MoreOverview from './MoreOverview'
import { Button } from '../ui/button'
import Link from 'next/link'
import { FaPlay } from "react-icons/fa";

function HeroPanoramica({ movie }) {
  const title = movie?.title ?? movie?.name
  const rawDate = movie.release_date ?? movie.first_air_date ?? '';
  const year = rawDate ? new Date(rawDate).getFullYear() : '';

  return (
    <div className='max-w-[500px] space-y-3 '>
      <h2 className='text-2xl md:text-4xl font-bold text-accent-foreground'>{title}</h2>
      <p className='text-accent-foreground'><span>{year}</span></p>
      <MoreOverview>{movie?.overview}</MoreOverview>
      <div className='space-x-6'>
        <Button asChild>
          <Link href={`/watch/${movie?.id}`}>
            <FaPlay />Riproduci
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default HeroPanoramica