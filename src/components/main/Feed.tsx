"use client";
import MaxWidthWrapper from "@/helper/MaxWidthWrapper";
import React from "react";
import Stories from "../cards/Stories";

const Feed = () => {
  return (
    <MaxWidthWrapper classname="max-w-6xl mx-auto">
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div id="rightFeed">
              <div id="storiesUser">
                <Stories />
              </div>
            </div>
          </section>
          <section>
            <div id="leftFeed" className="col-span-1 hidden xl:inline">
              <div id="miniProfile">
                <h1>Right Sidde</h1>
              </div>
              <div id="suggestionProfile"></div>
            </div>
          </section>
        </div>
      </main>
    </MaxWidthWrapper>
  );
};

export default Feed;
