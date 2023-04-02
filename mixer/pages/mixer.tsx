import NavBar from "@/components/Mixer/NavBar";
import TrackEditor from "@/components/Mixer/TrackEditor";
import TracksBar from "@/components/Mixer/TracksBar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function Mixer() {
  return (
    <main className="h-screen bg-base-200 p-2 flex flex-col gap-3">
      <NavBar />
      <PanelGroup direction="vertical">
        <Panel defaultSize={40}>
          <TracksBar />
        </Panel>
        <PanelResizeHandle className="bg-base-200 h-3"/>
        <Panel defaultSize={60}>
          <TrackEditor />
        </Panel>
      </PanelGroup>
    </main>
  )
}
