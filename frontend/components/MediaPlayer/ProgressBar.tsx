import styles from "@/styles/ProgressBar.module.css";
import { useMantineTheme } from "@mantine/core";

export interface ProgressBarProps {
  className?: string;
  size: number;
  progress: number;
  trackWidth: number;
  indicatorWidth: number;
  trackColor?: string;
  indicatorColor?: string;
}

export default function ProgressBar(props: ProgressBarProps) {
  const theme = useMantineTheme();
  const {
    className = "",
    size,
    progress,
    trackWidth,
    indicatorWidth,
    trackColor = theme.colors.dark[7],
    indicatorColor = "red",
  } = props;
  const center = size / 2,
    radius = center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
    dashArray = 2 * Math.PI * radius,
    dashOffset = dashArray * ((100 - progress) / 100);

  return (
    <div className={`${className} relative`}>
      <svg
        style={{ width: size, height: size }}
      >
        <circle
          cx={center}
          cy={center}
          fill="transparent"
          r={radius}
          stroke={trackColor}
          strokeWidth={trackWidth}
        />
        <circle
          cx={center}
          cy={center}
          fill="transparent"
          r={radius}
          stroke={indicatorColor}
          strokeWidth={indicatorWidth}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          strokeLinecap={"round"}
        />
      </svg>
    </div >
  )
}
