import { Image, Transition } from '@mantine/core';
import styles from '@/styles/Vinyl.module.css';
import { ForwardedRef, forwardRef, RefObject, useContext, useEffect, useRef, useState } from 'react';
import { useStreamPlayer } from './useStreamPlayer';
import { StreamContext } from '../Provider/StreamProvider';
import ProgressBar from './ProgressBar';
import { FastAverageColor } from 'fast-average-color';


const scaleSize = {
  out: { height: 0, width: 0 },
  in: { height: "300%", width: "300%" },
  common: {},
  transitionProperty: "height, width"
}

const fac = new FastAverageColor();

const VinylPlayer = () => {
  const { dispatch } = useContext(StreamContext);
  const [isPlaying, setIsPlaying] = useState(false);

  const ref = useRef(null);

  const { state } = useContext(StreamContext);
  const thumbnail = state.clips.length > 0 ? state.clips[0].thumbnail : "";

  const [playerProgress] = useStreamPlayer({ volume: 50, isPlaying });
  return (
    <div
      className={`relative w-fit h-fit cursor-grab `}>
      <div
        className={`absolute bg-black w-full h-full z-10 rounded-full pointer-events-none opacity-20`} />
      <div className={`absolute -z-20 w-fit h-fit top-1/2 left-1/2 transform -translate-x-1/2 
                  -translate-y-1/2 -rotate-90`}
      >
        <ProgressBar size={310}
          progress={playerProgress} trackWidth={5} indicatorWidth={5} />
      </div>
      <div
        style={{ height: "300%", width: "300%", backgroundImage: `url(${thumbnail})`, backgroundSize: "cover", opacity: "30%" }}
        className='absolute -z-20 top-1/2 left-1/2 transform -translate-x-1/2 
                  -translate-y-1/2 blur-3xl rounded-full'  >
      </div>
      <div
        onClick={() => setIsPlaying(!isPlaying)}
        className={`${!isPlaying ? styles.stop : ""} ${styles.spin}`}>
        <div style={{ width: 105, height: 105 }}
          className={`absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 
                  -translate-y-1/2 rounded-full mix-blend-multiply ${styles.grainy}`}>
        </div>
        <div className={`w-fit h-fit overflow-hidden`}>
          <Image
            width={300}
            height={300}
            src="/vinyl.png"
            alt="Vinyl"
          />
          <Image
            ref={ref}
            className={`absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 
                  -translate-y-1/2 rounded-full overflow-hidden`}
            width={105}
            height={105}
            src={thumbnail}
            alt="thumbnail"
          />
        </div>
      </div>
    </div >
  );
}

export default VinylPlayer;
