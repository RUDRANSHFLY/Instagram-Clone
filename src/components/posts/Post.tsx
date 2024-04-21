import {
  Bookmark,
  Ellipsis,
  HeartIcon,
  MessageCircle,
  Send,
  Smile,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { UserAuth } from "@/context/AuthContext";
import {
  DocumentData,
  QueryDocumentSnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import db from "@/firebase/FireBase";
import Comment from "../cards/Comment";

interface PostProps {
  id: string;
  userName: string;
  userProfilePic: string;
  postPic: string;
  postCaption: string;
}

const Post = ({
  id,
  userName,
  userProfilePic,
  postPic,
  postCaption,
}: PostProps) => {
  const { user } = UserAuth();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timeStamp", "desc")
      ),
      (snapShot) => {
        setComments(snapShot.docs);
      }
    );

    return () => {};
  }, [user?.uid, id]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id == user?.uid) !== -1);
  }, [user?.uid, likes, id]);

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapShot) => {
      setLikes(snapShot.docs);
    });

    return () => {};
  }, [user?.uid, id]);

  const handlePostLike = async () => {
    hasLiked
      ? await deleteDoc(doc(db, "posts", id, "likes", user?.uid))
      : await setDoc(doc(db, "posts", id, "likes", user?.uid), {
          userName: user.displayName,
        });
  };

  const handelComment = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      userName: user.displayName,
      userPic: user.photoURL,
      timeStamp: serverTimestamp(),
    });
  };

  return (
    <div className="flex flex-col bg-white border rounded-sm px-2">
      {/* Upper-Post Section */}
      <div id="upperPostSection" className="flex items-center p-5">
        <div className="relative h-12 w-12 p-1 mr-3">
          <Image
            src={userProfilePic}
            fill={true}
            alt={"User Pic"}
            sizes={"100vw,100vh"}
            className="rounded-full border-2 border-black"
          />
        </div>
        <h2 className="flex-1 font-bold">{userName}</h2>
        <Ellipsis className="navBtn" />
      </div>
      {/* Below-Post Section */}
      <div
        id="belowPostSection"
        className="mx-auto object-contain aspect-auto relative w-full h-96  sm:h-[500px]"
      >
        <Image
          src={postPic}
          fill={true}
          sizes={"100vw,100vh"}
          alt={"Post Pic"}
        />
      </div>
      {/* Button-Section Post */}
      {user ? (
        <div className="flex justify-between py-4 px-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIcon
                fill="red"
                className="cursor-pointer"
                onClick={handlePostLike}
              />
            ) : (
              <HeartIcon className="cursor-pointer" onClick={handlePostLike} />
            )}

            <MessageCircle className="cursor-pointer" />
            <Send className="cursor-pointer" />
          </div>
          <Bookmark className="cursor-pointer" />
        </div>
      ) : null}
      {/* Caption Secttion Post*/}

      {likes.length > 0 && (
        <p className="font-bold ml-4 ">{likes.length} likes</p>
      )}
      <div className="py-1 px-4 truncate">
        <h3 className="font-bold">
          {userName}@ <span className="font-medium">{postCaption}</span>
        </h3>
      </div>

      {/* Comments of Post */}

      {comments.length > 0 && (
        <div className="ml-4 mb-5 mt-2 h-20 overflow-y-scroll scrollbar-hide">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              userName={comment.data().userName}
              userPic={comment.data().userPic}
              userComment={comment.data().comment}
              userTimeStamp={comment.data().timeStamp?.toDate()}
            />
          ))}
        </div>
      )}

      {user ? (
        <div className="flex py-1 align-baseline items-center justify-between">
          <Smile className="navBtn" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder=" Post Comment..."
            className="flex-1 ml-2 py-3 font-semibold rounded-md focus:ring-0 border-0 active:ring-0 outline-0 shadow-lg"
          />
          <Button
            variant={"ghost"}
            className="bg-slate-950 text-white"
            disabled={!comment.trim()}
            onClick={handelComment}
          >
            Post
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Post;
