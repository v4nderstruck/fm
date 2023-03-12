import { Howl } from "howler";
import { useCallback, useContext, useEffect, useState } from "react";
import { StreamContext, StreamContextType } from "../Provider/StreamProvider";

export interface StreamControls {
  volume: number;
  isPlaying: boolean;
}

function useStreamPlayer(controls: StreamControls) {
  const streamContext = useContext(StreamContext);
  const [player, setPlayer] = useState<Howl[]>([]);

  // volume and play controls
  useEffect(() => {
    const track = player.length > 0 && player[0];
    if (controls.isPlaying && track && !track.playing())
      track.play();
    if (!controls.isPlaying)
      Howler.stop();

    Howler.volume(controls.volume / 100);
  }, [controls.volume, controls.isPlaying, player]);

  // update stream on new data
  useEffect(() => {
    console.log("Received clips", streamContext.state.clips);
    setPlayer(streamContext.state.clips.map((item) => new Howl(
      {
        src: item.src,
        html5: true,
        onend: () => { streamContext.dispatch({ type: "nextClip" }) }
      }
    )))
  }, [streamContext]);
}

export { useStreamPlayer };
