import { Container, Text } from "@mantine/core";
import { IconLivePhoto } from "@tabler/icons-react";
import AudioStream from "../MediaPlayer/AudioStream";
import GenericCarousel from "./GenericCarousel";
import Upcoming from "./Upcoming";

export default function ContentArea() {
    return (
        <Container>
            <Upcoming />
        </Container>
    )
}