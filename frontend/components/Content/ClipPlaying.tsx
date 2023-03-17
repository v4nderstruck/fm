import styles from "@/styles/ClipPlaying.module.css";
import { useContext } from "react";
import { StreamContext } from "../Provider/StreamProvider";


export default function ClipPlaying() {
  const { state } = useContext(StreamContext);
  const title = state.clips.length > 0 ? state.clips[0].title : "";
  const description = state.clips.length > 0 ? state.clips[0].description : "";
  return (
    <div className="relative w-full h-full mix-blend-color-dodge">

      <div className={`absolute left-4 w-[50%] ${styles.wrap}`}>
        {/* @ts-ignore */}
        <span style={{ "--color-even": "#8F43EE" }}
          className={`${styles["fly"]} ${styles.even}`}> {description} </span>
        {/* @ts-ignore */}
        <span style={{ "--color-odd": "#DC5F00" }}
          className={`${styles["fly"]} ${styles.odd}`}> {title} </span>
        {/* @ts-ignore */}
        <span style={{ "--color-even": "#8F43EE" }}
          className={`${styles["fly"]} ${styles.even}`}> {description} </span>
        {/* @ts-ignore */}
        <span style={{ "--color-odd": "#DC5F00" }}
          className={`${styles["fly"]} ${styles.odd}`}> {title} </span>

      </div>
    </div>

  )
}
