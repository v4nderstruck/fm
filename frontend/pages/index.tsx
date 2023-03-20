import ClipPlaying from "@/components/Content/ClipPlaying";
import MobileNavBar from "@/components/Content/MobileNavBar";
import NavBar from "@/components/Content/NavBar";
import VinylPlayer from "@/components/MediaPlayer/VinylPlayer";
import { Container, MediaQuery } from "@mantine/core";
import { RefObject, useRef, useState } from "react";

export default function Home() {
  return (
    <main className="h-screen w-screen min-h-screen overflow-hidden relative" >
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <div className="absolute z-20 left-4 top-1/2 -translate-y-1/2">
          <NavBar />
        </div>
      </MediaQuery>
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <div>
          <div className="absolute bottom-0 h-64 w-full z-10
            bg-gradient-to-t from-black via-black to-transparent ">
          </div>
          <div className="absolute z-20 right-10 bottom-10 ">
            <MobileNavBar />
          </div>
        </div>
      </MediaQuery>
      <div className="absolute z-10 bottom-4 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <VinylPlayer />
      </div>
      <div className="absolute w-[100%] sm:w-[50%] h-full right-4 -top-4 ">
        <ClipPlaying />
      </div>
    </main>
  )
}
