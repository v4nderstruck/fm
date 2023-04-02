import { TrackMetadata } from "@/types/protocol/Track";
import { useContext, useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { ThemeCtx } from "@/components/Providers/ThemeProvider";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
// @ts-ignore 
import daisyColors from 'daisyui/src/colors/themes';
import Spinner from "../helpers/Spinner";
import { invoke } from "@tauri-apps/api";


export type TrackVisualizerProps = {
  track: TrackMetadata;
}


// todo: global states to work with navigation!!
export default function TrackVisualizer({ track }: TrackVisualizerProps) {
  const { theme } = useContext(ThemeCtx);
  const visualizerRef = useRef<HTMLDivElement>(null);
  const [wave, setWave] = useState<WaveSurfer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob>(new Blob());

  useEffect(() => {
    if (!visualizerRef.current) return;

    const fetch = async () => {
      setIsLoading(true);
      const audioArray = await invoke("audio_stream_handler", {id: track.trackId});
      console.log(audioArray)
      if (audioArray) setAudioBlob(new Blob([new Uint8Array(audioArray.value)], {type: "audio/mp3"}))
      setIsLoading(false);
    };

    fetch();
  }, [track.source])

  useEffect(() => {
    if (!visualizerRef.current) return;
    if (wave) wave.destroy();
    if (audioBlob.size == 0)  return;

    const newWave = WaveSurfer.create({
      progressColor: `${daisyColors[`[data-theme=${theme.value}]`].primary}`,
      waveColor: `${daisyColors[`[data-theme=${theme.value}]`].accent}`,
      cursorColor: `${daisyColors[`[data-theme=${theme.value}]`]['base-content']}`,
      container: visualizerRef.current,
    });
  
    console.log("Loading Blob");
    newWave.loadBlob(audioBlob);
    setWave(newWave);
    setIsPlaying(false);
  }, [audioBlob ])

  useEffect(() => {
    if (!wave) return;
    if (isPlaying) {
      wave.play();
    } else {
      wave.pause();
    }
  }, [isPlaying, wave])

  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="text-xl text-accent">Audio</h1>
      <div className="p-2 bg-base-200 rounded-lg flex flex-col gap-2">
        <div ref={visualizerRef}></div>
        {isLoading ? <Spinner /> : (
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="btn btn-xs btn-primary w-fit self-end">
            {isPlaying ? (
              <div className="flex gap-1">
                <IconPlayerPause size={12} />
                <p>Pause</p>
              </div>
            ) : (
              <div className="flex gap-1">
                <IconPlayerPlay size={12} />
                <p>Play</p>
              </div>
            )
            }
          </button>
        )}
      </div>
    </div>
  )
}
