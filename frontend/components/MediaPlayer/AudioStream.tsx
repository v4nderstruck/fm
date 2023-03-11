import { useContext, useEffect, useRef } from "react";
import { StreamContext } from "../Provider/StreamProvider";

export interface AudioStreamProps {
  isPlaying: boolean;
  volume: number;
}

export default function AudioStream(props: AudioStreamProps) {
  const audioPlayerRef: React.Ref<HTMLMediaElement> = useRef(null);
  const streamContext = useContext(StreamContext);
  const { isPlaying, volume } = props;

  useEffect(() => {
    if (!audioPlayerRef.current) return;
    const audioPlayer = audioPlayerRef.current;

    audioPlayer.onloadeddata = () => {
      if (isPlaying && audioPlayer.readyState >= 2)
        audioPlayer.play();
    }

    // play next song when current song ends
    audioPlayer.onended = () => {
      console.log("Audio ended, playing next song");
      const { state, dispatch } = streamContext || {};
      audioPlayer.pause();
      if (state != undefined && dispatch != undefined) {
        dispatch({ type: "nextClip" });
        audioPlayer.src = state.clips[0].src;
        audioPlayer.load();
      }
    };
  }, [audioPlayerRef, streamContext]);

  useEffect(() => { // play controls and volume controls
    console.log("isPlaying: ", isPlaying);
    console.log("volume: ", volume)
    if (!audioPlayerRef.current) return;
    isPlaying ? audioPlayerRef.current.play() : audioPlayerRef.current.pause();
    volume >= 0 && (audioPlayerRef.current.volume = volume / 100);
  }, [isPlaying, audioPlayerRef, volume]);

  useEffect(() => {
    if (!audioPlayerRef.current) return;
    const audioPlayer = audioPlayerRef.current;
    const { state } = streamContext || {};
    audioPlayer.src = state != undefined && state.clips.length > 0 ? state.clips[0].src : "";
    console.log("new src: ", state != undefined && state.clips.length > 0 && state.clips[0].src);
  }, [streamContext]);

  return (
    <audio id="player" ref={audioPlayerRef} src="">
    </audio>
  )
}
