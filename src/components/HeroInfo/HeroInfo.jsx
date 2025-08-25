'use client'
import Image from 'next/image';
import { useState } from 'react';
import HeroNav from './HeroNav';
import HeroDettagli from './HeroDettagli';
import HeroPanoramica from './HeroPanoramica';
import HeroEpisodi from './HeroEpisodi';


function HeroInfo({ movie, seasons= null, episodes=null }) {
  if (!movie?.backdrop_path) return null
  const [active, setActive] = useState('Panoramica')
  
  const links = ['Panoramica', 'Dettagli']
  if (movie?.media_type === 'tv') links.push('Episodi')
  
  const path = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`

  // Pick del contenuto senza side-effect
  const renderContent = () => {
    switch (active) {
      case 'Panoramica':
        return <HeroPanoramica movie={movie} />
      case 'Dettagli':
        return <HeroDettagli movie={movie} />
      case 'Episodi':
        return <HeroEpisodi
            seasons={seasons}
            episodes={episodes}
          />
      default:
        return null
    }
  }

  return (
    <div
      className={` relative ${active === 'Panoramica' ? 'bg-gradient-to-r from-white dark:from-black from-25% lg:from-40% via-transparent to-transparent' : ''}`}>

      <div className={`md:absolute -z-10 right-0 rounded-md overflow-hidden`}>
        <Image width={768} height={400} src={path} alt='BackDrop Image'></Image>
      </div>

      <div className='flex-col-reverse md:flex-row p-2 md:p-8 md:min-h-[432px] flex items-center'>
        {renderContent()}

        <HeroNav links={links} active={active} setActive={setActive} />

      </div>

    </div >
  )
}

export default HeroInfo