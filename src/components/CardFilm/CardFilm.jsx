'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { IoIosInformationCircleOutline } from "react-icons/io";
import {
  Drawer, DrawerTrigger, DrawerContent,
  DrawerHeader, DrawerTitle, DrawerDescription,
  DrawerFooter,
  DrawerClose
} from '@/components/ui/drawer';
import useMediaQuery from '@/hooks/useMediaQuery';
import { FaPlayCircle, FaRegStar, FaStar } from 'react-icons/fa';
import { IoIosArrowDropdownCircle, IoIosCloseCircle } from 'react-icons/io';
import { LuCirclePlus } from 'react-icons/lu';
import ButtonCard from './ButtonCard';

export default function CardMedia({ media }) {
  // Unifica titolo e date
  const title = media.title ?? media.name;
  const rawDate = media.release_date ?? media.first_air_date ?? '';
  const year = rawDate ? new Date(rawDate).getFullYear() : '';
  if (!media.poster_path) return null
  const imgUrl = `https://image.tmdb.org/t/p/w342${media.poster_path}`;

  // Determina il tipo: priorità a media_type, fallback alla presenza di first_air_date
  const type = media.media_type
    ? media.media_type
    : media.first_air_date
      ? 'tv'
      : 'movies';

  // Path per dettagli e play
  const detailHref = `/${type}/${media.id}`;
  const watchHref = `/watch/${type}/${media.id}`;

  const isMobile = useMediaQuery('(max-width: 767px)');
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    const rect = cardRef.current.getBoundingClientRect()
    let origin = "center"
    const threshold = 200 // distanza dal bordo in px 
    if (rect.left < threshold) {
      origin = "left"
    }
    else if (window.innerWidth - rect.right < threshold) {
      origin = "right"
    }
    cardRef.current.style.transformOrigin = origin
  }

  // Versione mobile con Drawer
  if (isMobile) return (
    <Drawer>
      <DrawerTrigger asChild>
        <div style={{ backgroundImage: `url(${imgUrl})` }} className="group md:hidden h-[300px] rounded-2xl bg-center bg-cover relative card" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='flex-row'>
          <Image
            src={imgUrl}
            alt={title}
            height={200}
            width={100}
            className="object-cover rounded"
          />
          <div className='text-left'>
            <DrawerTitle>{title}</DrawerTitle>
            <p className="text-xs"> {year} </p>
            <DrawerDescription className='line-clamp-6'>{media?.overview}</DrawerDescription>
          </div>
          <DrawerClose className='self-start text-2xl'>
            <IoIosCloseCircle />
          </DrawerClose>
        </DrawerHeader>
        <DrawerFooter className='text-4xl flex-row justify-evenly'>
          <ButtonCard link={watchHref} text='Riproduci'>
            <FaPlayCircle className='cursor-pointer' />
          </ButtonCard>
          <ButtonCard link={detailHref} text='Info'>
            <IoIosInformationCircleOutline className='cursor-pointer' />
          </ButtonCard>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )

  // Versione desktop
  return (
    <div ref={cardRef} className='group relative transform transition-transform duration-300 hover:scale-105 hover:z-10'>
      <Link href={detailHref}>
        <div

          onMouseEnter={handleMouseEnter}
          style={{ backgroundImage: `url(${imgUrl})` }}
          className="h-[300px] rounded-2xl group-hover:rounded-b-none bg-center bg-cover relative "
        >
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-t-2xl transition-opacity">
            <h3 className="px-2 text-center text-white font-bold">{title}</h3>
          </div>
        </div>
      </Link>
      <div className="absolute top-full w-full bg-red-800 text-white p-2 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="flex justify-between items-center mb-1">
          <div className="flex space-x-3 text-2xl">
            <Link href={watchHref}>
              <FaPlayCircle className="cursor-pointer" />
            </Link>
            <LuCirclePlus className="cursor-pointer" />
            <FaRegStar className="cursor-pointer" />
          </div>
          <Link href={detailHref}>
            <IoIosArrowDropdownCircle className="text-xl" />
          </Link>
        </div>
        <p className="text-xs">
          <span className="text-green-500">Valutazione {media.vote_average}</span> - {year}
        </p>
      </div>
    </div>
  );
}
