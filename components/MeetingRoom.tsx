import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutGrid, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

type CallLayoutType = "grid" | "speaker-right" | "speaker-left";

const MeetingRoom = () => {

  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticpants, setShowParticpants] = useState(false);
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');

  const {useCallCallingState} = useCallStateHooks();
  const callingState = useCallCallingState();

  if(callingState !== CallingState.JOINED) return <Loader/>

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
      <div className="relative flex size-full items-center justify-center text-white">
        <div className="flex size-full items-center max-w-5xl px-2">
          <CallLayout />
        </div>
        <div
          className={cn(`h-[calc(100vh-40px)] p-4 hidden ml-2 bg-dark-2`, {
            "block": showParticpants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticpants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 mt-4 w-full flex flex-wrap items-center justify-center sm:gap-5 text-white">
        <CallControls />
        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 py-2 rounded-2xl bg-[#19232d] hover:bg-[#4c535b]">
            <LayoutGrid size={20} className="text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-dark-2 bg-dark-2 text-white">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, key) => (
              <div key={key}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    setLayout(item.toLowerCase() as CallLayoutType);
                  }}
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-2" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={()=>setShowParticpants((prev) => !prev)}>
          <div className="px-4 py-2 rounded-2xl bg-[#19232d] hover:bg-[#4c535b]">
            <Users size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton/> }
      </div>
    </section>
  );
};

export default MeetingRoom;
