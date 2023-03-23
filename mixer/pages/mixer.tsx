import NavBar from "@/components/Mixer/NavBar";
import TracksBar from "@/components/Mixer/TracksBar";

export default function Mixer() {
  return (
    <main className="h-screen bg-base-200 p-2">
      <NavBar />
      <TracksBar />
    </main>
  )
}
