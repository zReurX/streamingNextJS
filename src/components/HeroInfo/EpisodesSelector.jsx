// app/components/EpisodesSelector.tsx
'use client';

import { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select';
import Swiper from '../Swiper';

export default function EpisodesSelector({ seasons, episodesBySeason }) {
  const [selected, setSelected] = useState(seasons[0].season_number);
  const episodes = episodesBySeason[selected] || [];

  return (
    <>
      <div className='w-full flex justify-end mb-2'>

        <Select
          value={selected.toString()}
          onValueChange={(val) => setSelected(Number(val))}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Seleziona stagione" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {seasons.map((s) => (
                <SelectItem
                  key={s.season_number}
                  value={s.season_number.toString()}
                >
                  {s.name} ({s.episode_count})
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Swiper film={false}>
        {episodes}
      </Swiper>
    </>
  );
}
