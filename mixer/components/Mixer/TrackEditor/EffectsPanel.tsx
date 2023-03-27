import { IconMoodEmpty } from "@tabler/icons-react";

export default function EditPanel() {
  return (
    <div className="w-full h-full bg-base-100 rounded-lg p-4 flex flex-col gap-4">
      <h1 className="text-xl">Effects</h1>
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <IconMoodEmpty />
        <p>Nothing found</p>
      </div>
    </div>
  )
}
