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
            <source src="https://rr4---sn-4g5lznl6.googlevideo.com/videoplayback?expire=1677773386&ei=6nUAZPLNI4y6gQfcioWgCQ&ip=45.80.188.26&id=o-AFQGUkjiLTjHw3bmNd1jIBMV_h_UxeC0luyyFb626Q2Q&itag=140&source=youtube&requiressl=yes&mh=Wq&mm=31%2C29&mn=sn-4g5lznl6%2Csn-4g5edndk&ms=au%2Crdu&mv=m&mvi=4&pl=24&initcwndbps=3243750&spc=H3gIhh5QAPhwlfeqyrptyCd-j1aV1Mc&vprv=1&svpuc=1&mime=audio%2Fmp4&gir=yes&clen=4399365&dur=271.789&lmt=1578736415973500&mt=1677751274&fvip=2&keepalive=yes&fexp=24007246&c=ANDROID&txp=5531432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgduHNSBJsfQSmXU22or56LvT-6aW9tHg2DkRm47PG_q8CIQDTBczN6ToA9SF6idXJLk6FKSJy0DhZwKCHnNA0av298g%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgOn7fYEo2ZcS5tRjszCd88bsYEIfFL9LxcuU_zca-4fMCIQCWGLu-vu5N3i33eM62OQ2HmKfqDU0LrgBy-gklJ8unVQ%3D%3D&host=rr4---sn-4g5lznl6.googlevideo.com" />
        </audio>
    )
}