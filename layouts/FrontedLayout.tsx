"use client";
import React, { createContext, useEffect, useState } from "react";

import MusicPlayer from "../src/components/MusicPlayer";
import Navbar from "../src/components/Navbar";
import Sidebar from "../src/components/Sidebar";
import Queue from "../src/components/Queue";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { song } from "@/types/song";

type PlayerContext = {
  isQueueModalOpen: boolean;
  setQueueModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentMusic: song | null;
  setCurrentMusic: React.Dispatch<React.SetStateAction<song | null>>;
  queue: song[];
  setQueue: (songs: song[]) => void;
  playNext: () => void;
  playPrev: () => void;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  currentIndex: number;
};
export const PlayerContext = createContext<PlayerContext | undefined>(
  undefined
);
export default function FrontedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const queryclient = new QueryClient();

  const [isQueueModalOpen, setQueueModalOpen] = useState(false);
  const [currentMusic, setCurrentMusic] = useState<null | song>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [queue, setQueue] = useState<song[]>([]);

  const playNext = () => {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex((prevIndex)=>prevIndex + 1)
    }
  }
  const playPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex)=>prevIndex -1)
    }
  }

  
  useEffect(() => {
    if (queue.length > 0 && currentIndex >= 0 && currentIndex < queue.length) {
 setCurrentMusic(queue[currentIndex]);
    }
  }, [currentIndex, currentIndex]);
   


  return (
    <QueryClientProvider client={queryclient}>
      <PlayerContext.Provider
        value={{
          isQueueModalOpen,
          setQueueModalOpen,
          currentMusic,
          setCurrentMusic,
          queue,
          setQueue,
          playNext,
          playPrev,
          setCurrentIndex,
          currentIndex
        }}
      >
        <div className="min-h-screen">
          <Navbar />
          <main>
            <Sidebar />
            <Queue />
            {currentMusic && <MusicPlayer />}
            {children}
          </main>
        </div>
      </PlayerContext.Provider>
    </QueryClientProvider>
  );
}

