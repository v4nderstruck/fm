import styles from "@/styles/ClipPlaying.module.css";
import { ForwardedRef, forwardRef, RefObject, useCallback, useContext, useEffect, useState } from "react";
import { StreamContext } from "../Provider/StreamProvider";
import { FastAverageColor } from "fast-average-color";



const ClipPlaying = () => {


  const { state } = useContext(StreamContext);
  const title = state.clips.length > 0 ? state.clips[0].title : "";
  const description = state.clips.length > 0 ? state.clips[0].description : "";

  return (
    <div className="relative h-full w-full mix-blend-color-dodge blur-sm">
      <div className={`absolute right-0 w-[100%] ${styles.wrap} flex flex-col items-end`}>
        {/* @ts-ignore */}
        <span style={{ "--text-color": state.render.textColorA }}
          className={`${styles["fly"]} ${styles.even}`}> {description} </span>
        {/* @ts-ignore */}
        <span style={{ "--text-color": state.render.textColorB }}
          className={`${styles["fly"]} ${styles.odd}`}> {title} </span>
        {/* @ts-ignore */}
        <span style={{ "--text-color": state.render.textColorA }}
          className={`${styles["fly"]} ${styles.even}`}> {description} </span>
        {/* @ts-ignore */}
        <span style={{ "--text-color": state.render.textColorB }}
          className={`${styles["fly"]} ${styles.odd}`}> {title} </span>
      </div>
    </div>

  )
}

export default ClipPlaying;
