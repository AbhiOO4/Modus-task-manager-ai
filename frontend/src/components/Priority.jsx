import React from 'react'
import { Circle, Subscript } from 'lucide-react'
import { ChevronRight } from 'lucide-react'

function Priority() {

  return (
    <div className='flex gap-1'>
        <Circle color="#dc2626" size={20} />
        <ChevronRight size={20} />
        <Circle color="#c2410c" size={20} />
        <ChevronRight size={20} />
        <Circle color="#1d4ed8" size={20} />
        <ChevronRight size={20} />
        <Circle color="#a16207" size={20} />
        <ChevronRight size={20} />
        <Circle color="#15803d" size={20} />
        <h1 className='font-semibold ms-2 hidden sm:block'>Priority Levels</h1>
    </div>
  )
}

export default Priority
