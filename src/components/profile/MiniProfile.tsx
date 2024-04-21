import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { UserAuth } from "@/context/AuthContext";

const MiniProfile = () => {
  const { user, userLogOut } = UserAuth();

  return (
    <div className="w-full flex justify-between align-baseline items-center mt-20 space-x-3 p-5">
      <div className="relative w-16 h-16">
        <Image
          src={user !== null ? user.photoURL : ""}
          fill={true}
          sizes={"100vw,100vh"}
          alt="User-Profile"
          className={"border rounded-full p-1"}
        />
      </div>

      <div>
        <h2 className="font-extrabold">
          @{user !== null ? user.displayName : ""}
        </h2>
        <h3 className="text-sm font-bold">Welcome to Instagram</h3>
      </div>

      <Button
        variant={"default"}
        className="bg-slate-950"
        onClick={async () => {
          await userLogOut();
        }}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default MiniProfile;
