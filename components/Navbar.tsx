import Image from "next/image";
import React from "react";
import MobileNav from "./MobileNav";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavList from "./NavList";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-4 sm:px-7 py-4 select-none">
      <Image src={"/assets/logo/logo.svg"} width={150} height={100} alt="..." />
      <div className="flex items-center gap-16 sm:pt-4">
        <NavList />
        <div className="flex gap-3">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="border border-black text-primary bg-black rounded-md px-2 py-1 hover:bg-primary hover:text-black">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
          <MobileNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
