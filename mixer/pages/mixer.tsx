import NavBar from "@/components/Mixer/NavBar";
import TrackEditor from "@/components/Mixer/TrackEditor";

export default function Mixer() {
  return (
    <main className="h-screen bg-base-200 p-2 flex flex-col gap-4">
      <NavBar />
      {/* <TracksBar /> */}
      <TrackEditor />
    </main>
  )
}
