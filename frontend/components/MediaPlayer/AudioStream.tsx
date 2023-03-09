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
        if(!audioPlayerRef.current) return;
        const audioPlayer = audioPlayerRef.current;

        audioPlayer.onloadeddata = () => { 
            if (isPlaying && audioPlayer.readyState >= 2)
                audioPlayer.play();
        }


        audioPlayer.onended = () => {
            console.log("Audio ended, playing next song");
            const {streamMetadata, setStreamMetadata} = streamContext || {};
            audioPlayer.pause();
            if (streamMetadata != undefined && streamMetadata.length > 0 && setStreamMetadata != undefined) {
                setStreamMetadata(streamMetadata.slice(1));
                audioPlayer.src = streamMetadata[0].src;
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
        const {streamMetadata} = streamContext || {};
        audioPlayer.src = streamMetadata != undefined && streamMetadata.length > 0 ? streamMetadata[0].src : "";
        console.log("new src: ", streamMetadata != undefined && streamMetadata.length > 0 && streamMetadata[0].src);
    }, [streamContext]);

    return (
        <audio id="player" ref={audioPlayerRef} src="">
        </audio>
    )
}