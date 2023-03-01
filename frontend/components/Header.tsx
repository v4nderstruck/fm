import { Text, Burger, Header, MediaQuery, useMantineTheme, Badge } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";
import { useState } from "react";

export interface HeaderBarProps {
    isLive: boolean;
}

export default function HeaderBar({ isLive }: HeaderBarProps) {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
        <Header height={{ base: 50, md: 70 }} p="md">
            <div className="flex justify-between  w-full h-full items-center">
                <Text fz="xl" fw={500}>Zen.FM</Text>
                <div className="flex gap-2">
                    <Badge variant="gradient"
                        className="bg-gradient-to-r from-purple-500 to-pink-500"
                        leftSection={<IconUsers size={12} />}>
                        1
                    </Badge>
                    {isLive && (
                        <Badge variant="gradient"
                            className="bg-gradient-to-r from-pink-500 to-orange-500">
                            LIVE
                        </Badge>
                    )}
                </div>
            </div>
        </Header>
    )
}