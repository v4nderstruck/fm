import { Footer, UnstyledButton, Text, Avatar, Indicator, Slider, Container, MediaQuery } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconHeadphones, IconMessage, IconPlayerPause, IconPlayerPlay, IconVolume } from "@tabler/icons-react";
import { useState } from "react";
import AudioStream from "./AudioStream";



export default function PlayerControls() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    return (
        <Footer height={60} p="md">
            <AudioStream isPlaying={isPlaying} volume={volume}  />
            <Container size="md" px={0}>
                <div className="flex justify-between items-center gap-4 w-full h-full">
                    <div className="max-w-[40%] overflow-hidden flex gap-2 ">
                        <Avatar src={null} color="gray" radius="md">
                            <IconHeadphones size={32} />
                        </Avatar>
                        <div>
                            <Text fz="xs" fw={100}>Now Playing:</Text>
                            <Text fz="sm" lineClamp={1} >Chris Brown - Yeah x3</Text>
                        </div>
                    </div>
                    <UnstyledButton
                        className="absolute left-1/2 transform -translate-x-1/2
                                hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 
                                hover:text-white
                                p-1 rounded-xl"
                        onClick={() => setIsPlaying(!isPlaying)}
                    >
                        {isPlaying ? <IconPlayerPause size={32} /> : <IconPlayerPlay size={32} />}
                    </UnstyledButton>
                    <div className="flex items-center gap-4">
                        <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
                            <Slider
                                thumbChildren={<IconVolume size={24} />}
                                styles={{ thumb: { borderWidth: 1 } }}
                                color="gray"
                                defaultValue={50}
                                className="w-32"
                                min={0}
                                onChangeEnd={setVolume}
                                value={volume}
                                max={100}
                            />
                        </MediaQuery>
                        <UnstyledButton>
                            <Indicator color="pink">
                                <IconMessage className="text-orange-500"
                                    size={32} />
                            </Indicator>
                        </UnstyledButton>
                    </div>
                </div>
            </Container>
        </Footer>
    )
}