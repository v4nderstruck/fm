import { IconChevronLeft, IconUsers } from "@tabler/icons-react"
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  return (

    <div className="navbar bg-base-100 rounded-md">
      <button
        onClick={() => { router.push("/") }}
        className="flex-none text-neutral mx-2 p-2 rounded-full hover:bg-base-300 cursor-pointer">
        <IconChevronLeft />
      </button>
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-primary">Mixer</h1>
      </div>
      <div className="flex-none">
        <div className="badge badge-accent flex gap-2 p-2">
          <IconUsers size={16} />
          1 Live
        </div>
      </div>
    </div>
  )
}
