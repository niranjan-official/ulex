"use client";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamOn, setIsMicCamOn] = useState(false);
  const call = useCall();

  useEffect(() => {
  console.log("Meeting Setup 2");
    if (isMicCamOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamOn, call?.camera, call?.microphone]);
  return (
    <div className="flex h-screen w-screen flex-col justify-center items-center text-black overflow-hidden">
      <div className="my-4 sm:mt-10">
        <VideoPreview />
      </div>
      <div className="flex flex-col h-16 items-center justify-center gap-3 mt-4">
        <label htmlFor="" className="flex justify-center items-center gap-2">
          <input
            type="checkbox"
            checked={isMicCamOn}
            onChange={(e) => setIsMicCamOn(e.target.checked)}
          />
          <span className="font-semibold">Join with camera and mic off</span>
          <div className="text-white">
        <DeviceSettings />
          </div>
        </label>
        <button
          onClick={() => {
            call?.join();
            setIsSetupComplete(true);
          }}
          className="px-3 py-2 bg-black rounded-[0.4rem] text-white"
        >
          Join Meeting
        </button>
      </div>
    </div>
  );
};

export default MeetingSetup;
