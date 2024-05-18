"use client";
import { NavbarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavList = () => {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-10 lg:gap-16 max-sm:hidden">
      {NavbarLinks.map((link, key) => {
        const isActive = pathname === link.route;
        return (
          <div
            key={key}
            className={cn(
              "flex items-center gap-1 pb-1 transition-all duration-300",
              {
                "border-b-4 border-black": isActive,
              }
            )}
          >
            <Image src={link.imgUrl} height={20} width={20} alt="..." />
            <Link className="sm:text-sm lg:text-[1rem] lg:font-semibold" href={link.route}>
              {link.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default NavList;
