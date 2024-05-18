'use client'
import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import {
    StreamVideo,
    StreamVideoClient,
  } from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';
  
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  
  export const StreamVideoProvider = ({children}:{children: ReactNode}) => {

    const [videoClient, setVideoClient] = useState<StreamVideoClient>();
    const {user, isLoaded} = useUser();

    useEffect(()=>{
      console.log(tokenProvider);
      
      if(!isLoaded || !user) return;
      if(!apiKey) throw new Error("Stream API key missing");

      const client = new StreamVideoClient({
        apiKey,
        user:{
          id: user?.id,
          name: user?.fullName || user?.id,
          image: user?.imageUrl
        },
        tokenProvider: tokenProvider
      })
      console.log(client);
      console.log(user);
      
      
      setVideoClient(client);
    },[user,isLoaded])
    if(!videoClient) return <Loader/>;

    return (
      <StreamVideo client={videoClient}>
          {children}
      </StreamVideo>
    );
  };