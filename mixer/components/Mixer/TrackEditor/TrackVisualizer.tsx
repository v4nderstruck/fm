import { TrackMetadata } from "@/types/protocol/Track";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export type TrackVisualizerProps = {
  track: TrackMetadata;
}

export default function TrackVisualizer({ track }: TrackVisualizerProps) {
  const visualizerRef = useRef<HTMLDivElement>(null);
  const [wave, setWave] = useState<WaveSurfer | null>(null);
  useEffect(() => {
    if (!visualizerRef.current) return;
    if (wave) wave.destroy();

    const newWave = WaveSurfer.create({
      container: visualizerRef.current,
    });

    newWave.load(`mixer://localhost/${track.trackId}`);
    setWave(newWave);
  }, [track])

  return (
    <div className="w-full">
      <div ref={visualizerRef}></div>
    </div>
  )
}
