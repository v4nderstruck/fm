import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SearchPanel from "./TrackEditor/SearchPanel";
import EditPanel from "./TrackEditor/EditPanel";
import EffectsPanel from "./TrackEditor/EffectsPanel";

export default function TrackEditor() {
  return (
    <div className="w-full h-[26rem]">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={15} minSize={15}>
          <SearchPanel />
        </Panel>
        <PanelResizeHandle className="bg-base-300 w-3" />
        <Panel defaultSize={60} >
          <EditPanel />
        </Panel>
        <PanelResizeHandle className="bg-base-300 w-3" />
        <Panel defaultSize={15} minSize={15}>
          <EffectsPanel />
        </Panel>
      </PanelGroup>
    </div>
  )
}
