"use client";
import Feed from "@/components/main/Feed";
import NavBar from "@/components/navbar/NavBar";
import Model from "@/model/Model";

export default function Home() {
  return (
    <div>
      <Model />
      <NavBar />
      <Feed />
    </div>
  );
}
