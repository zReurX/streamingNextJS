'use client'
import Link from "next/link"
import { FaPlayCircle, FaRegStar, FaStar } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { LuCirclePlus } from "react-icons/lu";
import { useRef } from "react"
import { redirect } from "next/navigation";

function CardFilm({ movie }) {
  if (!movie?.poster_path) return null

  const path = `https://image.tmdb.org/t/p/w342${movie.poster_path}`
  const cardRef = useRef(null)

  const handleMouseEnter = () => {
    const rect = cardRef.current.getBoundingClientRect()
    let origin = "center"
    const threshold = 200 // distanza dal bordo in px

    if (rect.left < threshold) {
      origin = "left"
    } else if (window.innerWidth - rect.right < threshold) {
      origin = "right"
    }
    cardRef.current.style.transformOrigin = origin
  }

  const yearFilm = new Date(movie.release_date).getFullYear().toString()

  const handelClick = () => {
    redirect(`/movies/${movie.id}`)
  }

  return (
    <>
      <div
        
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        style={{ backgroundImage: `url(${path})` }}
        className="group h-[300px] md:hover:rounded-b-none rounded-2xl bg-center bg-cover hover:z-10 relative transform md:hover:scale-125 card"
      >
        {/* Overlay visibile solo al passaggio */}
        <div
          onClick={handelClick}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          className="cursor-pointer max-md:hidden absolute inset-0 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <h3 className="text-lg cursor-default font-bold text-white text-center px-2">{movie.title}</h3>
        </div>
        <div className="max-md:hidden absolute top-full w-full bg-red-800 text-white p-2 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Link href={`/watch/${movie.id}`}>
                <FaPlayCircle className='cursor-pointer' />
              </Link>
              <LuCirclePlus className='cursor-pointer' />
              <FaRegStar className='cursor-pointer' />
            </div>
            <Link href={`/movies/${movie.id}`}>
              <IoIosArrowDropdownCircle />
            </Link>
          </div>
          <p className="text-xs">
            <span className="text-sm text-green-500">Valutazione {movie.vote_average} </span>
            - {yearFilm}
            </p>
      </div>
    </div >
      <style jsx>{`
        .card {
          transition: transform 300ms ease-out;
        }
        .group:hover .card {
          transition-delay: 200ms;
        }
      `}</style>
    </>
  )
}

export default CardFilm