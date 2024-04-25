import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="h-screen flex flex-col">
      <Navbar />
        <section className="w-full flex flex-1 px-4 sm:px-12 py-10">
          {children}
        </section>
    </main>
  );
};

export default HomeLayout;
