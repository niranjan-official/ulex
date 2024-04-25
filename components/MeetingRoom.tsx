import { cn } from "@/lib/utils";
import { CallControls, CallParticipantsList, PaginatedGridLayout, SpeakerLayout } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

type CallLayoutType = "grid" | "speaker-right" | "speaker-left";

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticpants,setShowParticpants] = useState(false);

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition={"left"} />;
      default:
        return <SpeakerLayout participantsBarPosition={"right"} />;
    }
  };
  return (
    <section className="relative h-screen w-screen pt-4 overflow-hidden bg-slate-700">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full items-center max-w-5xl text-white px-2">
          <CallLayout />
        </div>
        <div className={cn(`h-[calc(100vh-86px)] hidden ml-2`, {'show-block': showParticpants})}>
          <CallParticipantsList onClose={()=>setShowParticpants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 text-white">
        <CallControls/>
      </div>
    </section>
  );
};

export default MeetingRoom;
