import { TrackMetadata } from "@/types/protocol/Track";
import { useReducer, useRef } from "react";
import TrackVisualizer from "./TrackVisualizer";

export type EditPanelProps = {
  loadedTrack: TrackMetadata | null;
  setLoadedTrack: (track: TrackMetadata | null) => void;
}


export default function EditPanel({ loadedTrack, setLoadedTrack }: EditPanelProps) {

  const editDrawerRef = useRef<HTMLInputElement>(null);

  function EditDrawer() {
    const titleRef = useRef<HTMLInputElement>(null);
    const artistRef = useRef<HTMLInputElement>(null);

    return (
      <div className="drawer-side">
        <label className="drawer-overlay" onClick={() => {
          setLoadedTrack({
            ...loadedTrack!,
            artist: artistRef.current!.value === "" ? artistRef.current!.placeholder : artistRef.current!.value,
            title: titleRef.current!.value === "" ? titleRef.current!.placeholder : titleRef.current!.value,
          })
          editDrawerRef.current!.checked = false;
        }} />

        <div className="p-4 w-80 bg-base-100 text-base-content">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <label className="input-group">
              <input
                ref={titleRef}
                type="text"
                placeholder={loadedTrack!.title}
                className="input input-bordered" />
            </label>
            <label className="label">
              <span className="label-text">Artist</span>
            </label>
            <label className="input-group">
              <input
                ref={artistRef}
                type="text"
                placeholder={loadedTrack!.artist}
                className="input input-bordered" />
            </label>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-base-100 rounded-lg p-4 flex flex-col gap-4">
      <div className="drawer drawer-end">
        <input ref={editDrawerRef} id="edit-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-xl">Editor</h1>
            {loadedTrack ? (
                <p className="text-xs">Track: {loadedTrack.trackId}</p>
            ) : <></>}
          </div>
          <div>
            {loadedTrack ? (
              <div>
                <h2 className="text-lg flex gap-2 items-center text-accent">
                  Track Metadata
                  <label htmlFor="edit-drawer" className="btn btn-xs btn-primary text-xs drawer-button">Edit</label>
                </h2>
                <div className="text-xs">
                  Name: {loadedTrack.title}
                </div>
                <div className="text-xs">
                  Artist: {loadedTrack.artist}
                </div>
                <div className="my-2">
                  <TrackVisualizer track={loadedTrack}/>
                </div>
              </div>
            ) : <></>}
          </div>
        </div>
        {loadedTrack && <EditDrawer />}
      </div>
    </div>
  )
}
