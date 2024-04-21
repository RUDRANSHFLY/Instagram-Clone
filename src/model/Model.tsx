import React, { useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "./atoms/modelAtom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import db, { storage } from "@/firebase/FireBase";
import { UserAuth } from "@/context/AuthContext";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Model = () => {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const fileRef = useRef<HTMLInputElement>(null);
  const captionRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>(
    null
  );

  const addPosttoDB = async () => {
    if (loading) return false;

    setLoading(true);

    const postObject = {
      id: user.uid,
      userName: user.displayName,
      caption: captionRef.current?.value,
      profileImg: user.photoURL,
      timeStamp: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "posts"), postObject);

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile as string, "data_url").then(
      async (snapShot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), { image: downloadURL });
      }
    );

    setLoading(false);
    setSelectedFile(null);
    setOpen(false);
  };

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files !== null) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvemt) => {
      if (readerEvemt.target?.result !== undefined) {
        setSelectedFile(readerEvemt.target?.result);
      }
    };
  };

  return (
    <>
      {open && (
        <Dialog open={open}>
          <DialogContent className="sm:max-w-[425px] absolute top-56 h-96">
            <DialogHeader className={"flex flex-col justify-center"}>
              <div>
                <DialogTitle>Upload a Post</DialogTitle>
              </div>
            </DialogHeader>
            <div className="flex flex-col space-y-5">
              <form>
                <div className="flex flex-col space-y-5">
                  <div className="flex flex-col space-y-2 mx-auto object-contain">
                    {selectedFile ? (
                      <div className="w-full h-40 cursor-pointer relative">
                        <Image
                          src={selectedFile as string}
                          alt="selected-post-image"
                          onClick={() => setSelectedFile(null)}
                          fill
                        />
                      </div>
                    ) : (
                      <div onClick={() => fileRef.current?.click()}>
                        <CameraIcon
                          className="h-10 w-10 shadow-sm border-slate-400 cursor-pointer text-center mx-auto my-5"
                          onClick={() => {
                            setSelectedFile(null);
                          }}
                        />
                      </div>
                    )}
                    <div className="hidden">
                      <input
                        type="file"
                        hidden={true}
                        ref={fileRef}
                        onChange={addImageToPost}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Caption
                      </Label>
                      <Input
                        id="caption"
                        ref={captionRef}
                        className="col-span-3 text-black font-bold"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <DialogFooter className={"mx-auto"}>
              <Button
                type="submit"
                onClick={() => {
                  addPosttoDB();
                }}
              >
                {loading ? "Uploading..." : "Upload Post"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Model;
