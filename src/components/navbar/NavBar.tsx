import MaxWidthWrapper from "@/helper/MaxWidthWrapper";
import { links } from "@/lib/links";
import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";
import {
  HomeIcon,
  MenuIcon,
  SearchIcon,
  PlusCircleIcon,
  Users2Icon,
  HeartIcon,
} from "lucide-react";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";

const NavBar = () => {
  return (
    <div>
      <MaxWidthWrapper classname="max-w-6xl mx-auto sticky top-0 z-50">
        <header>
          <div className="mt-1 py-2 px-2 shadow-lg flex justify-between items-center align-baseline">
            {/* Left-NavBar Section*/}
            <div id="navleft" className="lg:relative lg:h-12 lg:w-32">
              <Image
                src={links.instaGramLogo}
                alt="InstaGram-Logo"
                fill={true}
                className="hidden lg:block object-contain"
              />
              <Image
                src={links.mobileInstagramLogo}
                alt="InstaGram-Logo"
                height={35}
                width={35}
                className="lg:hidden"
              />
            </div>
            {/* Main NavBar */}
            <div
              id="mainNavBar"
              className="hidden sm:flex justify-between items-center gap-2"
            >
              <div>
                <SearchIcon />
              </div>
              <Input type="email" className="" placeholder="Search User" />
            </div>
            {/* Right-Section NavBar*/}
            <div
              id="rightNavBar"
              className="flex space-x-4 justify-end items-center align-baseline"
            >
              <MenuIcon className="w-8 h-8 lg:hidden cursor-pointer" />
              <HomeIcon className="navBtn" />
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn -rotate-45" />
                <div className="absolute bottom-3 -right-2 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-xs animate-pulse text-white">
                  3
                </div>
              </div>
              <PlusCircleIcon className="navBtn" />
              <Users2Icon className="navBtn" />
              <HeartIcon className="navBtn" />
              {/* User-Section Menu*/}
              <Image
                width={50}
                height={50}
                alt="User Profile"
                src={"https://links.papareact.com/3ke"}
                className="rounded-lg shadow-lg cursor-pointer"
              />
            </div>
          </div>
        </header>
      </MaxWidthWrapper>
    </div>
  );
};

export default NavBar;
