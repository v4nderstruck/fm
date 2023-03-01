import { IconHeadphones, IconLivePhoto, IconVolume2 } from "@tabler/icons-react";
import { Badge, Image, Text, UnstyledButton, useMantineTheme } from "@mantine/core";
import GenericCarousel from "./GenericCarousel";

const mockData = [
    { id: 1, playing: true, title: 'Blinding lights', subtitle: 'The Weeknd', art: "https://picsum.photos/200" },
    { id: 2, title: 'Paparazzi', subtitle: 'Lady Gaga', art: "https://picsum.photos/200" },
    { id: 3, title: 'I can\'t feel my face', subtitle: 'The Weeknd', art: "https://picsum.photos/200" },
    { id: 4, title: 'Like it', subtitle: 'Doja Cat', art: "https://picsum.photos/200" },
    { id: 5, title: 'Dont\'t Stop me', subtitle: 'Queen', art: "https://picsum.photos/200" },
]

export default function Upcoming() {
    const theme = useMantineTheme();
    return (
        <GenericCarousel title={
            <div className="flex justify-between item-center w-full">
                <div className="flex items-center gap-4">
                    <IconLivePhoto className="text-red-500" />
                    <Text fz="xl" fw={600}>Upcoming Live</Text>
                </div>
                <UnstyledButton>
                    <Badge variant="gradient" className="bg-gradient-to-r from-pink-400 via-red-500 to-orange-400"
                        leftSection={<IconHeadphones size={16}/>}>
                        Listen
                    </Badge>
                </UnstyledButton>
            </div>
        }
            withSeparator
            separator={<div className="w-full h-0.5 mb-2 rounded-lg
                                        bg-gradient-to-r from-pink-400 via-red-500 to-orange-400" />}
            data={mockData}
            render={(item) => {
                return (
                    <div key={item.id} className={`w-[20%] ${item.playing ? "h-28" : "h-24"}  hover:h-44 overflow-hidden relative `}>
                        <Image 
                            src={item.art}
                        />
                        {item.playing && 
                            <Badge variant="outline" 
                                className="border-opacity-60 border-red-600 text-opacity-60 text-red-600 right-1 top-1 absolute z-10"
                                leftSection={<IconVolume2 size={16}/>}
                                >
                                PLAYING
                            </Badge>
                        }
                        <div className="absolute left-0 top-0 p-2 w-full h-full bg-opacity-50 bg-gray-400"> 
                            <div className="flex h-full w-full gap-1 flex-col-reverse text-white">
                                <Text className="p-1 bg-red-800 bg-opacity-60 w-fit rounded-lg" 
                                    fz="sm" fw={600}>{item.title}</Text>
                                <Text className="p-1 bg-red-800 bg-opacity-60 w-fit rounded-lg" 
                                    fz="xs" fw={300}>{item.subtitle}</Text>
                            </div>
                        </div>
                    </div>
                )
            }}
        />
    )
}