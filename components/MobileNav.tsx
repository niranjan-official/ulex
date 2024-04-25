"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavbarLinks } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="sm:hidden">
      <div className="flex flex-col">
        <Sheet>
          <SheetTrigger asChild>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
              />
            </svg>
          </SheetTrigger>
          <SheetContent
            side={"left"}
            className="border-none outline-none bg-primary text-black p-0"
          >
            <div className="flex flex-col py-6">
              <Image
                src={"/assets/logo/logo.svg"}
                width={150}
                height={100}
                alt="..."
                className="ml-4"
              />
              <hr className="mx-5 mt-6 border border-black" />
              <div className="flex flex-col h-max gap-5 px-3 pt-10">
                {NavbarLinks.map((obj, key) => {
                  const isActive = pathname === obj.route;
                  return (
                    <Link
                      href={obj.route}
                      className="focus:outline-none focus:ring-0 transition-all duration-300"
                    >
                      <SheetClose className="w-full" asChild>
                        <div
                          className={cn(
                            "w-full flex gap-3 items-center p-4 pr-10",
                            {
                              "bg-neutral-300 rounded-xl shadow-md": isActive,
                            }
                          )}
                        >
                          <Image
                            width={20}
                            height={20}
                            alt="..."
                            src={obj.imgUrl}
                            className="text-primary"
                          />
                          <h1 className="text-lg font-semibold">{obj.title}</h1>
                        </div>
                      </SheetClose>
                    </Link>
                  );
                })}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
};

export default MobileNav;
