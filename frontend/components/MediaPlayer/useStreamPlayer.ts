import { Howl } from "howler";
import { useContext, useEffect, useState } from "react";
import { StreamContext } from "../Provider/StreamProvider";

export interface StreamControls {
  volume: number;
  isPlaying: boolean;
}

function useStreamPlayer(controls: StreamControls) {
  const streamContext = useContext(StreamContext);
  const [player, setPlayer] = useState<{ src: String, howl: Howl }[]>([]);


  // volume and play controls
  useEffect(() => {
    const track = player.length > 0 && player[0];


    if (controls.isPlaying && track && !track.howl.playing())
      track.howl.play();
    if (!controls.isPlaying && track && track.howl.playing())
      track.howl.pause();
    else if (!controls.isPlaying)
      Howler.stop();

    Howler.volume(controls.volume / 100);
  }, [controls.volume, controls.isPlaying, player]);

  // update stream on new data
  useEffect(() => {
    console.log("Received clips", streamContext.state.clips);
    setPlayer(streamContext.state.clips.map((item, index) => {
      if (index === 0) {
        if (player.length > 0 && item.src === player[0].src)
          return player[0]; // do not fiddle with currently playing track if not needed
        else
          Howler.stop(); 
      }
      return {
        src: item.src,
        howl: new Howl(
          {
            src: item.src,
            html5: true,
            onend: () => { streamContext.dispatch({ type: "nextClip" }) }
          })
      }
    }
    ))
  }, [streamContext]);
}

export { useStreamPlayer };
