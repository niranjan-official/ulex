import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-primary'>
      <Image src={'/assets/loading.svg'} width={75} height={70} alt='loading'/>
    </div>
  )
}

export default Loader
