"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { BadgeCheck, Copy, Link } from "lucide-react";
import { Button } from "./ui/button";

const HomeButtons = () => {
  const user = useUser();
  const client = useStreamVideoClient();
  const router = useRouter();
  const { toast } = useToast();
  const [callId, setCallId] = useState("");

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date and time",
        });
        return;
      }
      const id = uuidv4();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);

      if (!values.description) {
        setCallId(call.id);
      }
      toast({
        title: "Meeting Created",
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Failed To Create meeting",
        description: error.message,
      });
    }
  };
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 max-sm:px-8">
      <div className="w-full sm:w-56 flex items-center gap-2 border border-black px-3 py-2 rounded-md">
        <Image
          src={"/assets/icons/keyboard.svg"}
          height={20}
          width={20}
          alt="..."
        />
        <input
          placeholder="Paste the link here"
          className="w-auto bg-transparent focus:outline-none focus:ring-0"
          type="text"
        />
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="flex items-center gap-2 bg-black hover:bg-transparent text-primary hover:text-black hover:ring-2 ring-black px-3 py-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-7 icon icon-tabler icons-tabler-outline icon-tabler-plus"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
            </svg>
            <span
              className="hover:fontipconfig
            i-semibold"
            >
              Create new
            </span>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-gray-100">
          {callId ? (
            <div className="w-full flex flex-col items-center">
              <BadgeCheck size={60} fill="black" className="text-white " />
              <span className="text-xl font-semibold">
                Meeting Created Successfully
              </span>
              <div className="w-full sm:w-4/5 flex items-center justify-between p-1 border-2 border-black rounded-[0.3rem] mt-4">
                <Link size={30} className="text-black mx-2" />
                <p className="w-full line-clamp-1 text-sm pr-2" >{meetingLink}</p>
                <button onClick={()=>{
                  navigator.clipboard.writeText(meetingLink)
                  toast({
                    title: "Meeting Link has been copied !"
                  })
                }} className="h-full flex gap-1 items-center bg-black text-white rounded-[0.3rem] px-2 py-2 text-sm hover:bg-black/70" ><Copy size={15} className="text-white" /> Copy</button>
              </div>
              <AlertDialogAction
                onClick={() => router.push(`/meeting/${callId}`)}
                className="bg-black text-gray-100 hover:bg-gray-700 rounded-[0.5rem] mt-4">
                Join Now
              </AlertDialogAction>
            </div>
          ) : (
            <div>
              <AlertDialogHeader>
                <AlertDialogTitle>Create a new meeting ?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <button
                  onClick={createMeeting}
                  className="bg-black text-gray-100 hover:bg-gray-700 px-4 py-2"
                >
                  Create
                </button>
              </AlertDialogFooter>
            </div>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default HomeButtons;
