import React from 'react'
import { Button } from './ui/button'
import { FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Link from 'next/link';



function HeroSection({ movie }) {
  if (!movie?.backdrop_path) return null

  const path = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`

  return (
    <div style={{
      backgroundImage: `url(${path})`
    }} className='h-96 bg-center rounded-md bg-cover relative'>
      <div className='bg-hero-section inset-0 absolute p-8 flex items-center '>
        <div className='max-w-[400px] space-y-3 '>
          <h2 className='text-2xl md:text-4xl font-bold text-accent-foreground'>{movie?.title ?? movie?.name}</h2>
          <p className='text-sm md:text-base line-clamp-5'>{movie?.overview}</p>
          <div className='space-x-6'>
            <Button asChild>
              <Link href={`/watch/${movie?.id}`}>
                <FaPlay />Riproduci
              </Link>
            </Button>
            <Button variant='secondary' asChild>
              <Link href={`/${movie?.media_type}/${movie?.id}`}>
                <IoIosInformationCircleOutline />Altre Info
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection