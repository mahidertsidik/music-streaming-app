// "use client"
import React, { useContext } from "react";
import Image from "next/image";
import { supabase } from "@/lib/SupabaseCLient";
import { useQuery } from "@tanstack/react-query";
import { song } from "@/types/song";
import DeleteButton from "./DeleteButton";
import { PlayerContext } from "@/layouts/FrontedLayout";
type UserSongsProps = {
  userId: string | undefined;
};
export default function UserSongs({ userId }: UserSongsProps) {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("playercontext must be used within a playerprovier");
  }
  const { setQueue, setCurrentIndex } = context;
  const getUserSongs = async () => {
    const { error, data } = await supabase
      .from("songs")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      console.log("fetch user songserror", error.message);
    }
    return data;
  };
  const {
    data: songs,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryFn: getUserSongs,
    queryKey: ["usersongs"],
  });

  const startPlayingSong = (songs: song[], index: number) => {
    setCurrentIndex(index);
    setQueue(songs);
  };
  if (isLoading)
    return (
      <div>
        {" "}
        {[...Array(10)].map((i, index) => (
          <div className="flex gap-2 animate-pulse mb-4" key={index}>
            <div className="w-10 h-10 rounded-md bg-hover "></div>
            <div className="h-5 w-[80%] rounded-md bg-hover "></div>
          </div>
        ))}
      </div>
    );

  if (isError)
    return (
      <h2 className="text-center text-white  text-2xl">{error.message}</h2>
    );
  if (songs?.length === 0) {
  return <h1 className="text-center text-white text-sm">You Have no songs in your library</h1>
}
  return (
    <div>
      {songs?.map((song: song, index) => {
        return (
          <div
            className="flex gap-2 items-center cursor-pointer mb-4 p-2 rounded-lg hover:bg-hover group relative"
            key={song.id}
            onClick={() => startPlayingSong(songs, index)}
          >
            <DeleteButton
              songId={song.id}
              imagePath={song.cover_image_url}
              audioPath={song.audio_url}
            />
            <Image
              src={song.cover_image_url}
              alt="cover img"
              className="w-10 h-10 object-cover rounded-md  "
              width={300}
              height={300}
            />

            <div>
              <p className="text-primary-text font-semibold">{song.title}</p>
              <p className="text-secondary-text text-sm ">{song.artist}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
