import { faker } from "@faker-js/faker";
import React, { useState, useEffect } from "react";
import SuggestedUser from "./SuggestedUser";
import { Button } from "../ui/button";

interface SuggestedUserProps {
  userName: string;
  userProfilePic: string;
  userBio: string;
}

const Suggestion = () => {
  const [suggestedUser, setsuggestedUser] = useState<SuggestedUserProps[]>([]);

  useEffect(() => {
    const dummySuggestedUser: SuggestedUserProps[] = [...Array(5)].map(
      (_, i) => ({
        userName: faker.person.firstName(),
        userProfilePic: faker.image.avatar(),
        userBio: faker.person.bio(),
      })
    );

    setsuggestedUser(dummySuggestedUser);
  }, []);

  return (
    <div className="mt-0 ml-8 p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-extrabold">Suggested For U</h2>
        <Button variant={"link"}>See All</Button>
      </div>
      <div className="flex flex-col space-y-4">
        {suggestedUser.map((suggestedUser) => (
          <SuggestedUser
            key={suggestedUser.userName}
            userName={suggestedUser.userName}
            userProfilePic={suggestedUser.userProfilePic}
            userBio={suggestedUser.userBio}
          />
        ))}
      </div>
    </div>
  );
};

export default Suggestion;
