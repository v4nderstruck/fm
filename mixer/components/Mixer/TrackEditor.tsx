import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SearchPanel from "./TrackEditor/SearchPanel";
import EditPanel from "./TrackEditor/EditPanel";
import EffectsPanel from "./TrackEditor/EffectsPanel";
import { useState } from "react";
import { TrackMetadata } from "@/types/protocol/Track";

export default function TrackEditor() {
  const [loadedTrack, setLoadedTrack] = useState<TrackMetadata | null>(null);

  return (
    <div className="w-full h-[28rem]">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={15} minSize={15}>
          <SearchPanel setLoadedTrack={setLoadedTrack}/>
        </Panel>
        <PanelResizeHandle className="bg-base-200 w-3" />
        <Panel defaultSize={60} >
          <EditPanel loadedTrack={loadedTrack} setLoadedTrack={setLoadedTrack}/>
        </Panel>
        <PanelResizeHandle className="bg-base-200 w-3" />
        <Panel defaultSize={15} minSize={15}>
          <EffectsPanel />
        </Panel>
      </PanelGroup>
    </div>
  )
}
