import TrackCard from "./helpers/TrackCard";
import TransitionInfo from "./helpers/TransitionInfo";

export default function TracksBar() {
  return (
    <div className="my-2 p-2 h-[25rem] w-96 bg-base-100 rounded-md flex flex-col gap-2 overflow-y-scroll">
      <div className="flex justify-between ">
        <TrackCard />
        <TransitionInfo />
      </div>
      <div className="divider my-0"></div>
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
      <TrackCard />
    </div>
  )
}
