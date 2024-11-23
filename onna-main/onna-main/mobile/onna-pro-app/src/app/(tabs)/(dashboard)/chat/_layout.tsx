import React, { useState, useEffect } from "react"
import { Stack, usePathname } from "expo-router"

import { colors } from "@/styles/colors"

import { useAsyncStorage } from "@/hooks/useAsyncStorage"

export default function ChatLayout() {
    // async storage
    const { readData } = useAsyncStorage()

    // hooks 
    const [name, setName] = useState<string>("");
    const path = usePathname()

    useEffect(() => {
        const Load = async () => {
            const data = await readData("@username")

            setName(data[0])
        }

        if (path.includes("chatRoom")) {
            Load()
        }
    }, [path]) 

    return (
        <Stack
            screenOptions={{
                headerTintColor: colors.black,
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen 
                name="chatRoom" 
                options={{ title: name || "Erro", headerStyle: { backgroundColor: colors.white } }} 
            />
        </Stack>
    )
}
