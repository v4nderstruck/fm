export default function TrackCard() {
  return (
    <div className="flex items-center gap-2">
      <div className="avatar">
        <div className="w-16 rounded-md">
          <img src="https://picsum.photos/200" alt="avatar" />
        </div>
      </div>
      <div>
        <p className="text-lg">Track Name</p>
        <p className="text-md">Description</p>
        <p className="text-xs">3:32/4:08</p>
      </div>
    </div>
  )
}

