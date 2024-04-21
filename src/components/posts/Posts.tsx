import React, { useState, useEffect } from "react";
import Post from "./Post";
import {
  QueryDocumentSnapshot,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import db from "@/firebase/FireBase";
import { error } from "console";

interface PostProps {
  id: string;
  userName: string;
  profileImg: string;
  image: string;
  caption: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  useEffect(() => {
    const dummyPosts = onSnapshot(
      query(collection(db, "posts"), orderBy("timeStamp", "desc")),
      (snapshot) => {
        const data = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
          id: doc.id,
          userName: doc.data().userName,
          profileImg: doc.data().profileImg,
          caption: doc.data().caption,
          image: doc.data().image,
        }));
        setPosts(data);
      },
      (error) => console.error(error)
    );

    return () => dummyPosts();
  }, []);

  return (
    <div>
      <div className={"pt-5 mx-auto flex flex-col space-y-5"}>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            userName={post.userName}
            userProfilePic={post.profileImg}
            postPic={post.image}
            postCaption={post.caption}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
