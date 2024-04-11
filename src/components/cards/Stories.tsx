import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";

interface Suggest {
  id: number;
  userName: string;
  userSecondName: string;
  bio: string;
  profilePic: string;
}

const Stories = () => {
  const [suggestion, setSuggestion] = useState<Suggest[]>();

  useEffect(() => {
    const demoSuggestion: Suggest[] = [...Array(20)].map((_, i) => ({
      id: i,
      userName: faker.person.firstName(),
      userSecondName: faker.person.lastName(),
      bio: faker.person.bio(),
      profilePic: faker.image.avatar(),
    }));
    setSuggestion(demoSuggestion);
  }, []);

  return (
    <div className="flex space-x-4 overflow-scroll scrollbar-hide">
      {suggestion?.map((profile) => (
        <Story
          key={profile.id}
          id={profile.id}
          bio={profile.bio}
          userName={profile.userName}
          userSecondName={profile.userSecondName}
          profilePic={profile.profilePic}
        />
      ))}

      {/* Story */}
      {/* Story */}
      {/* Story */}
      {/* Story */}
      {/* Story */}
      {/* Story */}
      {/* Story */}
      {/* Story */}
      {/* Story */}
      {/* Story */}
      {/* Story */}
      {/* Story */}
      {/* Story */}
    </div>
  );
};

export default Stories;
