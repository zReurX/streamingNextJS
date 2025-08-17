import { Skeleton } from '@/components/ui/skeleton'
import { Divide } from 'lucide-react'
import React from 'react'

function loading() {
  return (
    <>
      <Skeleton />
      <div className='bg-accent'>Loading...</div>
    </>
  )
}

export default loading