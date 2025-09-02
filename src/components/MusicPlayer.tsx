"use client";
import React, {  useEffect, useRef, useState, useContext } from "react";
import Image from "next/image";
import {
  IoMdPause,
  IoMdPlay,
  IoMdSkipBackward,
  IoMdSkipForward,
  IoMdVolumeHigh,
  IoMdVolumeOff,
} from "react-icons/io";
import { LuRepeat, LuRepeat1 } from "react-icons/lu";
import { MdOutlineQueueMusic } from "react-icons/md";
import { PlayerContext } from "../../layouts/FrontedLayout";
export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [previousvolume, setPreviousVolume] = useState(0);
  const [repeatSong, setRepeatSong] = useState(false);

  const context = useContext(PlayerContext);
  if (!context) throw new Error("player context must be within a provider");
  const {
    isQueueModalOpen,
    setQueueModalOpen,
    currentMusic,
    playNext,
    playPrev,
  } = context;
  const togglePLayButton = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsMusicPlaying(!isPlaying);
  };
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration | 0);
    };
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
    };
  }, []);
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseInt(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol / 100;
    }
  };
  const toggleMute = () => {
    if (volume === 0) {
      // unmute
      setVolume(previousvolume);
      if (audioRef.current) {
        audioRef.current.volume = previousvolume / 100;
      }
    } else {
      //mute music
      setPreviousVolume(volume);
      setVolume(0);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    }
  };
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentMusic) return;
    const playAudio = async () => {
      try {
        await audio.play();
        setIsMusicPlaying(true);
      } catch (error) {
        console.log("audioplay error:", error);
        setIsMusicPlaying(false);
      }
    };
    playAudio();
  }, [currentMusic]);
  // this would listen fr when song end
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      if (repeatSong) {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNext();
      }
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [repeatSong, playNext]);
  if (!currentMusic) return null;

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-black text-white 
    px-4 py-3 shadow-md z-50"
    >
      <audio src={currentMusic.audio_url || ""} ref={audioRef}></audio>
      <div
        className="max-w-8xl w-[95%] mx-auto flex items-center 
      justify-between"
      >
        <div className="flex gap-4 items-center">
          <Image
            src={currentMusic.cover_image_url || ""}
            alt="cover"
            width={500}
            height={500}
            className="w-13 h-13 object-cover rounded-md "
          />
          <div>
            <p className="text-white">{currentMusic.title}</p>
            <p className="text-secondary-text font-normal">
              {currentMusic.artist}
            </p>
          </div>
        </div>
        {/* song controls */}
        <div className="max-w-[400px] w-full flex items-center flex-col gap-3">
          <div className="flex gap-4">
            <button className="text-xl text-secondary-text" onClick={playPrev}>
              <IoMdSkipBackward />
            </button>
            <button
              onClick={togglePLayButton}
              className="bg-white text-xl text-black w-10 h-10 rounded-full grid place-items-center"
            >
              {/* <IoMdPlay /> */}
              {isPlaying ? <IoMdPause /> : <IoMdPlay />}
            </button>
            <button className="text-xl text-secondary-text" onClick={playNext}>
              <IoMdSkipForward />
            </button>
          </div>
          <div className="w-full flex justify-center items-center gap-2">
            <span className="text-secondary-text font-normal text-sm">
              {formatTime(currentTime)}
            </span>
            <div className="w-full">
              <input
                onChange={handleSeek}
                type="range"
                min="0"
                max="duration"
                value={currentTime}
                className="w-full outline-none bg-zinc-700 rounded-md h-1 appearance-none accent-white"
              />
            </div>
            <span className="text-secondary-text font-normal text-sm">
              {formatTime(duration)}
            </span>
          </div>
        </div>
        {/* voulume control */}
        <div className="flex items-center gap-2 ">
          {repeatSong ? (
            <button className="text-primary" onClick={()=>setRepeatSong(false)}>
              <LuRepeat1 />
            </button>
          ) : (
            <button className="" onClick={()=>setRepeatSong(true)}>
              <LuRepeat />
            </button>
          )}
          <button>{/* <LuRepeat /> */}</button>
          <button
            onClick={() => setQueueModalOpen(!isQueueModalOpen)}
            className="text-secondary-text text-xl cursor-pointer"
          >
            <MdOutlineQueueMusic />
          </button>
          {volume === 0 ? (
            <button
              onClick={toggleMute}
              className="text-secondary-text text-xl cursor-pointer"
            >
              <IoMdVolumeOff />
            </button>
          ) : (
            <button
              onClick={toggleMute}
              className="text-secondary-text text-xl cursor-pointer"
            >
              <IoMdVolumeHigh />
            </button>
          )}
          <input
            onChange={handleVolumeChange}
            value={volume}
            type="range"
            min="0"
            max="100"
            className="width-[100px] 
            outline-none h-1 bg-zinc-700 accent-white appearance-none"
          />
        </div>
      </div>
    </div>
  );
}
