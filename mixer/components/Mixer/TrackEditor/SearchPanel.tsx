import { TrackMetadata } from "@/types/protocol/Track";
import { IconMoodEmpty, IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Spinner from "../helpers/Spinner";

export type SearchPanelProps = {
  setLoadedTrack: (track: TrackMetadata | null) => void;
}

/// todo: add some stream context shit, metadata endpoint
export default function SearchPanel({ setLoadedTrack }: SearchPanelProps) {
  const inputRef = useRef(null);
  const [trackId, setTrackId] = useState<{ value: string }>({ value: "" });
  const [track, setTrack] = useState<TrackMetadata | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (trackId.value !== "") {
      setLoading(true);
      axios.get(`/api/yt/q/${trackId.value}`, { responseType: "arraybuffer" })
        .then((res) => {
          const { data } = res;
          const parsedTrack = TrackMetadata.decode(new Uint8Array(data));
          console.log(parsedTrack);
          setTrack(parsedTrack);
        })
        .catch((err) => { console.log(err) })
        .finally(() => setLoading(false));
    }
  }, [trackId]);


  return (
    <div className="w-full h-full bg-base-100 rounded-lg p-4 flex flex-col gap-4">
      <h1 className="text-xl">Tracks</h1>
      <div className="form-control">
        <div className="input-group">
          <input ref={inputRef} type="text" placeholder="Track Id" className="input input-bordered w-full" />
          <button className="btn btn-square" onClick={() => {
            /// @ts-ignore 
            setTrackId({ value: inputRef.current!.value });
          }}>
            {loading ? <Spinner /> : <IconSearch />}
          </button>
        </div>
      </div>


      <div className="w-full flex justify-center">
        {track && !loading ? (
          <div className="card w-full shadow-xl">
            <figure>
              <img src={track.thumbnail} alt="thumbnail" />
            </figure>
            <div className="card-body gap-4">
              <h2 className="card-title justify-between">
                {track.trackId}
                <button
                  onClick={() => {setLoadedTrack(track)}}
                  className="btn btn-primary btn-xs" > Load</button>
              </h2>
              <div>
                <audio src={track.source} controls className="w-full" />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xs text-base-content fill-primary italic">
            {loading ? <Spinner /> : (
              <div className="flex items-center gap-2">
                <IconMoodEmpty />
                <p>Nothing found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div >
  )
}
