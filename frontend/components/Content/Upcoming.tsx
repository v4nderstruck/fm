import { IconHeadphones, IconLivePhoto, IconVolume2 } from "@tabler/icons-react";
import { Badge, Image, Text, UnstyledButton } from "@mantine/core";
import GenericCarousel from "./GenericCarousel";
import { StreamContext } from "../Provider/StreamProvider";
import { useContext } from "react";
import { ClipMetadata } from "@/types/protocol/Stream";


export default function Upcoming() {
  const { state } = useContext(StreamContext);
  return (
    <GenericCarousel title={
      <div className="flex justify-between item-center w-full">
        <div className="flex items-center gap-4">
          <IconLivePhoto className="text-red-500" />
          <Text fz="xl" fw={600}>Upcoming Live</Text>
        </div>
        <UnstyledButton>
          <Badge variant="gradient" className="bg-gradient-to-r from-pink-400 via-red-500 to-orange-400"
            leftSection={<IconHeadphones size={16} />}>
            Listen
          </Badge>
        </UnstyledButton>
      </div>
    }
      withSeparator
      separator={<div className="w-full h-0.5 mb-2 rounded-lg
                                        bg-gradient-to-r from-pink-400 via-red-500 to-orange-400" />}
      data={state.clips}
      render={({ item, index }) => {
        const { src, title, description } = item as ClipMetadata; // Todo: add thumbnail
        return (
          <div key={src} className={`w-[20%] ${index == 0 ? "h-28" : "h-24"}  hover:h-44 overflow-hidden relative `}>
            <Image
              src={"https://picsum.photos/200"}
            />
            {index == 0 &&
              <Badge variant="outline"
                className="border-opacity-60 border-white text-opacity-60 text-white right-1 top-1 absolute z-10"
                leftSection={<IconVolume2 size={16} />}
              >
                PLAYING
              </Badge>
            }
            <div className="absolute left-0 top-0 p-2 w-full h-full bg-opacity-50 bg-gray-400">
              <div className="flex h-full w-full gap-1 flex-col-reverse text-white">
                <Text className="p-1 bg-red-800 bg-opacity-60 w-fit rounded-lg"
                  fz="sm" fw={600}>{title}</Text>
                <Text className="p-1 bg-red-800 bg-opacity-60 w-fit rounded-lg"
                  fz="xs" fw={300}>{description}</Text>
              </div>
            </div>
          </div>
        )
      }}
    />
  )
}
