import { Stack } from "expo-router"

import { colors } from "@/styles/colors"

export default function ArticlesLayout() {
    return (
        <Stack
            screenOptions={{
                headerTintColor: colors.black,
                headerShadowVisible: false
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="content" options={{ title: "", headerStyle: { backgroundColor: colors.gray } }} />
        </Stack>
    )
}