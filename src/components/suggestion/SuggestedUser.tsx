import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

interface SuggestedUserProps {
  userName: string;
  userProfilePic: string;
  userBio: string;
}

const SuggestedUser = ({
  userName,
  userProfilePic,
  userBio,
}: SuggestedUserProps) => {
  return (
    <div className="flex justify-between cursor-pointer">
      <div className="flex space-x-4 align-baseline items-center">
        <div className="relative w-14 h-14">
          <Image
            src={userProfilePic}
            alt={"Suggested User"}
            fill={true}
            className="rounded-full border-0 shadow-lg"
          />
        </div>
        <div className="w-32">
          <h2 className="font-extrabold">@{userName}</h2>
          <h3 className="font-bold truncate">{userBio}</h3>
        </div>
      </div>
      <Button className=" shadow-2xl">Follow</Button>
    </div>
  );
};

export default SuggestedUser;
