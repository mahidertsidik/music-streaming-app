"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { PlayerContext } from "@/layouts/FrontedLayout";
import { song } from "@/types/song";
export default function Queue() {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("player context must be within a provider");
  const {
    isQueueModalOpen,
    currentMusic,
    currentIndex,
    queue,
    setCurrentIndex,
    setQueue,
  } = context;
  const startPlayingSong = (songs: song[], index: number) => {
    setCurrentIndex(index);
    setQueue(songs);
  };
  if (!isQueueModalOpen) return null;
  return (
    <div
      className="fixed top-18 right-15 z-50
      max-w-[300px] w-full h-[75vh] bg-black border-1
      p-4 overflow-y-auto rounded-md"
    >
      <h2>Queue</h2>
      <div>
        <h2 className="text-white font-bold mb-3">Now Playing </h2>
        <div className="flex items-center cursor-pointer mb-2 rounded-lg gap-2 hover:hover">
          {currentMusic && (
            <Image
              className="w-10 h-10 object-cover rounded-md"
              src={currentMusic?.cover_image_url}
              alt="yui"
              width={300}
              height={300}
            />
          )}
          <div>
            <p className="text-primary font-semibold">{currentMusic?.title}</p>
            <p className="text-sm text-secondary-text">
              {currentMusic?.artist}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-white font-bold mb-3">Queue List </h2>
        {queue.map((song: song, index) => {
          return (
            <div
              className="flex items-center cursor-pointer mb-2 rounded-lg gap-2 hover:hover"
              key={song.id}
              onClick={() => startPlayingSong(queue,index)}
            >
              <Image
                className="w-10 h-10 object-cover rounded-md"
                src={song.cover_image_url}
                alt="yui"
                width={300}
                height={300}
              />
              <div>
                <p className={` font-semibold ${currentIndex===index ? "text-primary":"text-primary-text"} `}>{song.title}</p>
                <p className="text-sm text-secondary-text">{song.artist}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
