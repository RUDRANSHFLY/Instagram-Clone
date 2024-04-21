"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import NavBar from "@/components/navbar/NavBar";
import { UserAuth } from "@/context/AuthContext";
import Image from "next/image";
import { links } from "@/lib/links";

const Signin = () => {
  const router = useRouter();
  const { userLogIn } = UserAuth();

  const handleSignIn = async () => {
    await userLogIn();
    router.push("/");
  };

  return (
    <div className="">
      <NavBar />
      <div className="w-3/4 h-2/4 flex flex-col justify-center mx-auto">
        <div className="relative w-60 h-56 sm:w-80 sm:h-72 lg:w-96 lg:h-80 mx-auto">
          <Image fill src={links.instaGramLogo} alt="InstaGram-Logo" />
        </div>

        <div className="mx-auto mb-5 text-center">
          <h1 className="text-3xl font-extrabold">This is INSTA CLONE</h1>
          <h2 className="text-2xl font-bold">Sign In Page</h2>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleSignIn}
            className={
              "p-3 bg-gray-800 text-white px-10 py-3 rounded-sm shadow-lg"
            }
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
