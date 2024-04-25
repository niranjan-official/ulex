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

const HomeButtons = () => {
  const user = useUser();
  const client = useStreamVideoClient();
  const router = useRouter();
  const { toast } = useToast();

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
      const id = crypto.randomUUID();
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
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting Created",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed To Create meeting",
        description: error.message
      });
    }
  };
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
          <button className="flex items-center gap-2 bg-black hover:bg-zinc-800 text-primary px-3 py-2 rounded-md">
            <Image
              src={"/assets/icons/add.svg"}
              height={20}
              width={20}
              alt="..."
            />
            <span>Create new</span>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-gray-100 ">
          <AlertDialogHeader>
            <AlertDialogTitle>Create a new meeting ?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={createMeeting}
              className="bg-black text-gray-100 hover:bg-gray-700"
            >
              Create
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default HomeButtons;
