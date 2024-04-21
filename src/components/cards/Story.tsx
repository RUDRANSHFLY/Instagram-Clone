import Image from "next/image";
import React from "react";

interface profileStory {
  id: number;
  bio: string;
  userName: string;
  profilePic: string;
  userSecondName: string;
}

const Story = ({
  bio,
  id,
  profilePic,
  userName,
  userSecondName,
}: profileStory) => {
  return (
    <div className="">
      <div className="relative h-14 w-14">
        <Image
          src={profilePic || ""}
          sizes={"100vw,100vh"}
          fill={true}
          className={
            "absolute object-contain rounded-full cursor-pointer p-1 border-2 border-red-700 sm:hover:scale-110 transform transition-all duration-200 ease-out"
          }
          priority={true}
          alt={"Story-User"}
        />
      </div>
      <p className={"text-xs truncate text-center"}>{userName || "User"}</p>
    </div>
  );
};

export default Story;
