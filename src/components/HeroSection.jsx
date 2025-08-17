import React from 'react'

function HeroSection({movie}) {
    if (!movie?.backdrop_path) return null

  const path = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`

  return (
    <div style={{
        backgroundImage:`url(${path})`
    }} className='h-96 bg-center bg-cover'>
        {console.log(movie)}
        <div>HeroSection</div>

    </div>
  )
}

export default HeroSection