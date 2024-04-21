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
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/context/AuthContext";
import { useRecoilState } from "recoil";
import { modalState } from "@/model/atoms/modelAtom";

const NavBar = () => {
  const router = useRouter();
  const { user } = UserAuth();
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div className="sticky top-0 z-50 bg-white">
      <MaxWidthWrapper classname="max-w-6xl mx-auto">
        <header>
          <div className="mt-1 py-2 px-2 shadow-lg flex justify-between items-center align-baseline">
            {/* Left-NavBar Section*/}
            <div id="navleft" className="relative lg:relative lg:h-12 lg:w-32">
              <Image
                src={links.instaGramLogo}
                alt="InstaGram-Logo"
                fill={true}
                sizes={"100vw,100vh"}
                priority={true}
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
              <HomeIcon
                className="navBtn"
                onClick={() => {
                  router.push("/");
                }}
              />

              {user != null ? (
                <>
                  <div className="relative navBtn">
                    <PaperAirplaneIcon className="navBtn -rotate-45" />
                    <div className="absolute bottom-3 -right-2 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-xs animate-pulse text-white">
                      3
                    </div>
                  </div>
                  <PlusCircleIcon
                    className="navBtn"
                    onClick={() => setOpen(true)}
                  />
                  <Users2Icon className="navBtn" />
                  <HeartIcon className="navBtn" />
                  {/* User-Section Menu*/}
                  <Image
                    width={50}
                    height={50}
                    alt="User Profile"
                    src={user.photoURL}
                    className="p-1 border-black border-2 rounded-full shadow-lg cursor-pointer"
                  />
                </>
              ) : (
                <div>
                  <Button
                    onClick={() => {
                      router.push("/auth");
                    }}
                  >
                    Sign In
                  </Button>
                </div>
              )}
            </div>
          </div>
        </header>
      </MaxWidthWrapper>
    </div>
  );
};

export default NavBar;
