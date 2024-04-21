import Image from "next/image";
import React from "react";
import Moment from "react-moment";

interface Props {
  userName: string;
  userPic: string;
  userComment: string;
  userTimeStamp: string;
}

const Comment = ({ userComment, userName, userPic, userTimeStamp }: Props) => {
  return (
    <div className="mb-2 sm:flex items-center space-x-4">
      <div className="mb-2 flex itmes items-center space-x-4 flex-1">
        <div className="relative w-10 h-10">
          <Image
            alt="user-profile-icon"
            src={userPic}
            fill
            sizes="100vw,100vh"
            className=" border-red-800 border-2 rounded-full"
          />
        </div>
        <p>
          <span className="text-base font-extrabold">{userName}</span>
        </p>
        <p>
          <span className=" font-semibold">{userComment}</span>
        </p>
      </div>
      <Moment fromNow className="font-semibold text-right">
        {userTimeStamp}
      </Moment>
    </div>
  );
};

export default Comment;
