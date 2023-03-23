import { IconRefresh } from "@tabler/icons-react"

export default function TransitionInfo() {
  return (
    <div className="flex items-center gap-2">
      <IconRefresh />
      <div>
        <p className="text-md">Description</p>
        <p className="text-xs">5sec</p>
      </div>
    </div>
  )
}
