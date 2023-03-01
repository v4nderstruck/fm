import { IconHeadphones, IconLivePhoto } from "@tabler/icons-react";
import { Badge, Image, Text, UnstyledButton, useMantineTheme } from "@mantine/core";
import GenericCarousel from "./GenericCarousel";

const mockData = [
    { id: 1, title: 'Blinding lights', subtitle: 'The Weeknd', art: "https://picsum.photos/200" },
    { id: 2, title: 'Paparazzi', subtitle: 'Lady Gaga', art: "https://picsum.photos/200" },
    { id: 3, title: 'Paparazzi', subtitle: 'Lady Gaga', art: "https://picsum.photos/200" },
    { id: 4, title: 'Paparazzi', subtitle: 'Lady Gaga', art: "https://picsum.photos/200" },
    { id: 5, title: 'Paparazzi', subtitle: 'Lady Gaga', art: "https://picsum.photos/200" },
    { id: 6, title: 'Paparazzi', subtitle: 'Lady Gaga', art: "https://picsum.photos/200" },
    { id: 8, title: 'Paparazzi', subtitle: 'Lady Gaga', art: "https://picsum.photos/200" },
    { id: 9, title: 'Paparazzi', subtitle: 'Lady Gaga', art: "https://picsum.photos/200" },
    { id: 10, title: 'Paparazzi', subtitle: 'Lady Gaga', art: "https://picsum.photos/200" },
    { id: 11, title: 'Paparazzi', subtitle: 'Lady Gaga', art: "https://picsum.photos/200" },

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
                    <div key={item.id} className="w-32 h-44 bg-transparent snap-center">
                        <div className="w-full h-full p-1 gap-2 flex flex-col items-start justify-center">
                            <Image
                                height={100}
                                width={100}
                                fit="cover"
                                withPlaceholder
                                src={item.art}
                            />
                            <div className="w-full flex flex-col justify-start">
                                <Text fz="md" fw={600} lineClamp={1}>{item.title}</Text>
                                <Text fz="sm" fw={400} lineClamp={1}>{item.subtitle}</Text>
                            </div>
                        </div>
                    </div>
                )
            }}
        />
    )
}