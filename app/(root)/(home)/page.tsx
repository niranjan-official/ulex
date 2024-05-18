import HomeButtons from "@/components/HomeButtons";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex w-full items-center justify-around">
      <div className="flex flex-col max-sm:items-center sm:pl-10 pb-10 z-10">
        <h1 className="porter-sans max-sm:text-center text-[42px] max-sm:leading-tight sm:text-6xl">
          <span>INSTANT</span>
          <br />
          <span>VIRTUAL</span>
          <br />
          <span>MEETUP</span>
        </h1>
        <p className="text-xl text-gray-500 sm:w-2/3 mt-4 max-sm:pl-4">
          Drop your meeting link here to jump into the video conference.
        </p>
        <HomeButtons/>
      </div>
      <div className="relative top-0 right-0 max-md:hidden z-0">
        <Image src={"/assets/hero.svg"} width={500} height={800} alt="..." />
      </div>
      <div className="absolute bottom-0 md:hidden opacity-20 z-0 overflow-x-hidden">
        <Image src={"/assets/hero.svg"} width={480} height={800} alt="..." />
      </div>
    </div>
  );
};

export default page;
