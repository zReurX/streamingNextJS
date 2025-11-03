import Image from 'next/image'
import { FaPlay } from "react-icons/fa";
import { AspectRatio } from '../ui/aspect-ratio';
import Link from 'next/link';


function CardEpisode({ ep }) {
  console.log(ep)
  return (
    <Link href={`/watch/${ep?.show_id}/${ep?.season_number}/${ep?.episode_number}`}>
      <AspectRatio ratio={16 / 9} className='group relative'>
        {ep.still_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${ep.still_path}`}
            alt={ep.name}
            className='rounded-md'
            priority={true}
            quality={50}
            fill
          />
        )}
        <h3 className='absolute bottom-2 left-2 text-2xl '>{ep?.episode_number}</h3>
        <div className='hidden absolute top-0 bottom-0 left-0 right-0  group-hover:flex items-center justify-center'>
          <FaPlay></FaPlay>
        </div>
      </AspectRatio>
      <div className="p-3 flex flex-col justify-between">
        <h4 className="font-semibold text-xs">
          {ep.name}
        </h4>
        <p className="mt-2 text-accent-foreground text-xs max-h-16 line-clamp-4 cursor-default hover:overflow-scroll hover:line-clamp-none">
          {ep.overview}
        </p>
      </div>
    </Link>
  )
}

export default CardEpisode

