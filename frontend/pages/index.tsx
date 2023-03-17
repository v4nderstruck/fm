import ClipPlaying from "@/components/Content/ClipPlaying";
import VinylPlayer from "@/components/MediaPlayer/VinylPlayer";
import { MediaQuery } from "@mantine/core";

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden relative">
      <div className="absolute w-full h-full">
        <ClipPlaying />
      </div>
      <div className="absolute z-10 bottom-4 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <VinylPlayer />
      </div>
    </main>
  )
}
