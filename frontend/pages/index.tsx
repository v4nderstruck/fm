import ContentArea from "@/components/Content/ContentArea";
import HeaderBar from "@/components/Header";
import PlayerControls from "@/components/MediaPlayer/PlayerControls";
import { AppShell } from "@mantine/core";
import { useState } from "react";

export default function Home() {
    const [isLive, setIsLive] = useState(true);
    return (
        <AppShell
            header={<HeaderBar isLive={isLive} />}
            footer={<PlayerControls />}
        >
            <ContentArea />
        </AppShell>
    )
}
