import { useEffect, useRef } from "react";

export interface AudioStreamProps {
    isPlaying: boolean;
    volume: number;
}

export default function AudioStream(props: AudioStreamProps) {
    const audioPlayerRef: React.Ref<HTMLMediaElement> = useRef(null);
    const { isPlaying, volume } = props;
    
    useEffect(() => { // play controls and volume controls
        console.log("isPlaying: ", isPlaying);
        console.log("volume: ", volume)
        if (!audioPlayerRef.current) return;
        isPlaying ? audioPlayerRef.current.play() : audioPlayerRef.current.pause();
        volume >= 0 && (audioPlayerRef.current.volume = volume / 100);
    }, [isPlaying, audioPlayerRef, volume]);


    return (
        <audio ref={audioPlayerRef}>
            <source src="" />
        </audio>
    )
}