import { Image, Transition } from '@mantine/core';
import styles from '@/styles/Vinyl.module.css';
import { useContext, useState } from 'react';
import { useStreamPlayer } from './useStreamPlayer';
import { StreamContext } from '../Provider/StreamProvider';
import ProgressBar from './ProgressBar';


const scaleSize = {
  out: { height: 0, width: 0 },
  in: { height: "175%", width: "175%" },
  common: {},
  transitionProperty: "height, width"
}

export default function VinylPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const { state } = useContext(StreamContext);
  const thumbnail = state.clips.length > 0 ? state.clips[0].thumbnail : "";

  const [playerProgress] = useStreamPlayer({ volume: 50, isPlaying });
  return (
    <div
      className={`relative w-fit h-fit cursor-grab `}>
      <Transition mounted={isPlaying} transition={scaleSize} duration={1000} timingFunction="ease">
        {(transition) => (
          <div
            style={{ ...transition, backgroundImage: `url(${thumbnail})`, backgroundSize: "cover", opacity: "20%" }}
            className='absolute -z-20 top-1/2 left-1/2 transform -translate-x-1/2 
                  -translate-y-1/2 blur-3xl rounded-full'  >
          </div>
        )}
      </Transition>
      <div
        className={`absolute bg-black w-full h-full z-10 rounded-full pointer-events-none opacity-50`} />
      <div className={`absolute -z-20 w-fit h-fit top-1/2 left-1/2 transform -translate-x-1/2 
                  -translate-y-1/2 -rotate-90`}
      >
        <ProgressBar size={310}
          progress={playerProgress} trackWidth={5} indicatorWidth={5} />
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