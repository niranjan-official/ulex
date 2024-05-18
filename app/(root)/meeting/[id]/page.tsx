'use client'
import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import Image from 'next/image';
import React, { useState } from 'react'

const page = ({params:{id}}:{params:{id:string}}) => {

  const {user, isLoaded} = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const {call, isCallLoading} = useGetCallById(id);

  if(!isLoaded || isCallLoading) return <Loader/>

  return (
    <main className='h-screen w-full flex'>
      <div className='fixed top-0 left-0 w-full bg-primary shadow-md p-2 px-10'>
      <Image src={"/assets/logo/logo.svg"} width={150} height={100} alt="..." />
      </div>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ?(
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ):(
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default page
