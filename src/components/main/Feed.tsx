import MaxWidthWrapper from "@/helper/MaxWidthWrapper";
import React from "react";
import Stories from "../cards/Stories";
import Posts from "../posts/Posts";
import MiniProfile from "../profile/MiniProfile";
import Suggestion from "../suggestion/Suggestion";
import { UserAuth } from "@/context/AuthContext";

const Feed = () => {
  const { user } = UserAuth();
  return (
    <MaxWidthWrapper classname="max-w-6xl mx-auto">
      <main>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            user ? "lg:grid-cols-3" : "lg:grid-cols-4 md:grid-cols-8"
          }`}
        >
          <section
            className={`${
              user
                ? "lg:col-span-2 md:col-span-1 flex flex-col"
                : "lg:col-start-2 md:col-span-6 lg:col-span-2 md:col-start-2"
            }`}
          >
            <div id="rightFeed">
              <div id="storiesUser">
                <Stories />
              </div>
              <div id="postsUser">
                <Posts />
              </div>
            </div>
          </section>
          {user ? (
            <section className="">
              <div id="leftFeed" className=" hidden md:inline xl:inline">
                <div className="fixed top-0">
                  <>
                    <MiniProfile />
                    <Suggestion />
                  </>
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </main>
    </MaxWidthWrapper>
  );
};

export default Feed;
